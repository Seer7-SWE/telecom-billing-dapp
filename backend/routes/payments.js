import express from "express";

const router = express.Router();

// Mock payments array
let payments = [];

// GET all payments
router.get("/", (req, res) => {
  res.json(payments);
});

// POST a new payment record
router.post("/", (req, res) => {
  const { user, amount, type } = req.body;
  const payment = {
    id: payments.length + 1,
    user,
    amount,
    type, // "recharge" or "settle"
    date: new Date(),
  };
  payments.push(payment);
  res.json(payment);
});

export default router;
