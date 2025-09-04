const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TelcoBilling", function () {
  let Token, token, Billing, billing, owner, operator, user;

  beforeEach(async () => {
    [owner, operator, user] = await ethers.getSigners();

    Token = await ethers.getContractFactory("ERC20PresetMinterPauser");
    token = await Token.deploy("MockUSDC", "mUSDC");
    await token.deployed();

    Billing = await ethers.getContractFactory("TelcoBilling");
    billing = await Billing.deploy(token.address, owner.address, operator.address);
    await billing.deployed();

    await token.mint(user.address, ethers.utils.parseUnits("1000", 18));
  });

  it("should allow plan creation and subscription", async () => {
    await billing.createPlan("Basic", 0, 1, 0, 30); // prepaid
    await token.connect(user).approve(billing.address, ethers.utils.parseUnits("100", 18));
    await billing.connect(user).subscribePlan(1);

    const sub = await billing.subs(user.address);
    expect(sub.active).to.equal(true);
  });

  it("should handle recharge for prepaid users", async () => {
    await billing.createPlan("Basic", 0, 1, 0, 30);
    await billing.connect(user).subscribePlan(1);
    await token.connect(user).approve(billing.address, 100);
    await billing.connect(user).recharge(100);

    const sub = await billing.subs(user.address);
    expect(sub.prepaidBalance).to.equal(100);
  });
});
