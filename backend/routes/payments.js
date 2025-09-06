import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    { user: "Alice", amount: 10.0, type: "recharge" },
    { user: "Bob", amount: 15.0, type: "settle" }
  ]);
});

export default router;
