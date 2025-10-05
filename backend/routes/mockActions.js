import express from "express";
import * as mock from "../mockBlockchain.js";

const router = express.Router();

// Subscribe to a plan
router.post("/subscribe", (req, res) => {
  const { userId, planId } = req.body;
  if (!userId || !planId) return res.status(400).json({ error: "Missing userId or planId" });
  const result = mock.subscribePlan(userId, planId);
  res.json(result);
});

// Recharge prepaid balance
router.post("/recharge", (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });
  const result = mock.recharge(userId, Number(amount));
  res.json(result);
});

// Deduct usage
router.post("/deductUsage", (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });
  const result = mock.deductUsage(userId, Number(amount));
  res.json(result);
});

// Settle postpaid bill
router.post("/settleBill", (req, res) => {
  const { userId, amount } = req.body;
  if (!userId || !amount) return res.status(400).json({ error: "Missing userId or amount" });
  const result = mock.settleBill(userId, Number(amount));
  res.json(result);
});

export default router;
