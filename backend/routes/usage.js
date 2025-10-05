import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";
import * as mock from "../mockBlockchain.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId || "demoUser";
    const supabase = getSupabaseClient();

    // Fetch from Supabase
    const { data, error } = await supabase
      .from("usage_logs")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw error;

    // Add mock blockchain usage logs
    const mockLogs = mock.getUsageLogs(userId);

    res.json([...data, ...mockLogs]);
  } catch (err) {
    console.error("GET /usage error:", err);
    res.status(500).json({ error: "Failed to fetch usage logs" });
  }
});

export default router;
