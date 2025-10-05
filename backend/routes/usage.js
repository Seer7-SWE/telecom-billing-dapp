// backend/routes/usage.js
import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";
import * as mock from "../mockBlockchain.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId || "demoUser";

    // Get from mock blockchain
    const usageData = mock.getUsageLogs(userId);

    // Optionally sync with Supabase
    const { data, error } = await supabase
      .from("usage")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase usage fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch usage logs" });
    }

    res.json({
      data: data || [],
      mock: usageData,
    });
  } catch (err) {
    console.error("Unhandled /usage error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
