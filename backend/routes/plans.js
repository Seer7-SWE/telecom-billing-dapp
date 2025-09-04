import express from "express";

const router = express.Router();

// Mock plans
let plans = [
  {
    planId: 1,
    name: "Basic Prepaid",
    planType: 0,
    pricePerUnit: "0.01",
    subscriptionFee: "0",
    validityDays: 30,
    active: true,
  },
  {
    planId: 2,
    name: "Postpaid Plus",
    planType: 1,
    pricePerUnit: "0.02",
    subscriptionFee: "5",
    validityDays: 0,
    active: true,
  },
];

// GET all plans
router.get("/", (req, res) => {
  res.json(plans);
});

// POST new plan (mock admin action)
router.post("/", (req, res) => {
  const newPlan = { planId: plans.length + 1, ...req.body };
  plans.push(newPlan);
  res.json(newPlan);
});

export default router;
