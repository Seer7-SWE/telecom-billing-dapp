import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("usage_logs")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw error;
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("GET /usage error:", err);
    res.status(500).json({ error: "Failed to fetch usage logs" });
  }
});

export default router;
