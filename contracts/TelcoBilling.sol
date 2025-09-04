// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TelcoBilling is AccessControl {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    IERC20 public immutable stable;
    uint256 public nextPlanId;

    enum PlanType { PREPAID, POSTPAID }

    struct Plan {
        string name;
        PlanType planType;
        uint256 pricePerUnit;      // in stable token smallest units (e.g., 1e-6 for USDC)
        uint256 subscriptionFee;   // upfront fee
        uint32 validityDays;       // for prepaid
        bool active;
    }

    struct Subscription {
        uint256 planId;
        uint64 startedAt;
        uint64 validUntil;
        uint256 prepaidBalance;
        uint256 postpaidAccrued;
        bool active;
    }

    mapping(uint256 => Plan) public plans;
    mapping(address => Subscription) public subs;

    event PlanCreated(uint256 indexed planId, string name, PlanType planType);
    event PlanUpdated(uint256 indexed planId, bool active);
    event Subscribed(address indexed user, uint256 indexed planId, uint64 startedAt, uint64 validUntil);
    event Recharged(address indexed user, uint256 amount, uint256 newBalance);
    event UsageRecorded(address indexed user, uint256 units, uint256 charge, PlanType planType);
    event BillSettled(address indexed user, uint256 amountPaid, uint256 remainingAccrued);

    constructor(address stableToken, address admin, address operator) {
        stable = IERC20(stableToken);
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(OPERATOR_ROLE, operator);
    }

    function createPlan(
        string calldata name,
        PlanType ptype,
        uint256 pricePerUnit,
        uint256 subscriptionFee,
        uint32 validityDays
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (uint256) {
        uint256 id = ++nextPlanId;
        plans[id] = Plan(name, ptype, pricePerUnit, subscriptionFee, validityDays, true);
        emit PlanCreated(id, name, ptype);
        return id;
    }

    function setPlanActive(uint256 planId, bool active) external onlyRole(DEFAULT_ADMIN_ROLE) {
        plans[planId].active = active;
        emit PlanUpdated(planId, active);
    }

    function subscribePlan(uint256 planId) external {
        Plan memory p = plans[planId];
        require(p.active, "Plan inactive");
        require(planId != 0, "Invalid plan");
        Subscription storage s = subs[msg.sender];
        require(!s.active, "Already subscribed");

        uint64 started = uint64(block.timestamp);
        uint64 validUntil = p.validityDays > 0 ? started + uint64(p.validityDays) * 1 days : type(uint64).max;

        if (p.subscriptionFee > 0) {
            require(stable.transferFrom(msg.sender, address(this), p.subscriptionFee), "Fee transfer failed");
        }

        s.planId = planId;
        s.startedAt = started;
        s.validUntil = validUntil;
        s.prepaidBalance = 0;
        s.postpaidAccrued = 0;
        s.active = true;

        emit Subscribed(msg.sender, planId, started, validUntil);
    }

    function recharge(uint256 amount) external {
        require(amount > 0, "zero");
        Subscription storage s = subs[msg.sender];
        require(s.active, "not subscribed");
        require(plans[s.planId].planType == PlanType.PREPAID, "not prepaid");
        require(stable.transferFrom(msg.sender, address(this), amount), "transfer failed");
        s.prepaidBalance += amount;
        emit Recharged(msg.sender, amount, s.prepaidBalance);
    }

    function recordUsage(address user, uint256 units) external onlyRole(OPERATOR_ROLE) {
        Subscription storage s = subs[user];
        require(s.active, "inactive");
        Plan memory p = plans[s.planId];
        uint256 charge = units * p.pricePerUnit;

        if (p.planType == PlanType.PREPAID) {
            require(s.prepaidBalance >= charge, "insufficient prepaid");
            s.prepaidBalance -= charge;
        } else {
            s.postpaidAccrued += charge;
        }

        emit UsageRecorded(user, units, charge, p.planType);
    }

    function settleBill(uint256 amount) external {
        Subscription storage s = subs[msg.sender];
        require(s.active, "inactive");
        require(plans[s.planId].planType == PlanType.POSTPAID, "not postpaid");
        require(amount > 0 && amount <= s.postpaidAccrued, "invalid amount");
        require(stable.transferFrom(msg.sender, address(this), amount), "transfer failed");
        s.postpaidAccrued -= amount;
        emit BillSettled(msg.sender, amount, s.postpaidAccrued);
    }

    function getSubscription(address user) external view returns (Subscription memory) {
        return subs[user];
    }
}
