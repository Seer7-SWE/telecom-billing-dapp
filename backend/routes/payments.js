import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";
import * as mock from "../mockBlockchain.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId || "demoUser";
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw error;

    // Example: add mock payments
    const mockBalance = mock.getBalance(userId);
    const mockPayments = [{ userId, amount: mockBalance.prepaid, date: new Date(), source: "mock" }];

    res.json([...data, ...mockPayments]);
  } catch (err) {
    console.error("GET /payments error:", err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
