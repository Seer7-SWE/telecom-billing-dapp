// backend/routes/mockActions.js
import express from "express";
import * as mock from "../mockBlockchain.js";
import { getSupabaseClient } from "../supabaseClient.js";

const router = express.Router();

// Subscribe to a plan
router.post("/subscribe", async (req, res) => {
  const { userId, planId } = req.body;
  const result = mock.subscribePlan(userId, planId);
  res.json(result);
});

// Recharge prepaid balance
router.post("/recharge", async (req, res) => {
  const { userId, amount } = req.body;
  const result = mock.recharge(userId, Number(amount));
  res.json(result);
});

// Deduct usage
router.post("/deductUsage", async (req, res) => {
  const { userId, amount } = req.body;
  const result = mock.deductUsage(userId, Number(amount));
  res.json(result);
});

export default router;
