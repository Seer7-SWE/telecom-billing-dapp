import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get usage logs (all users for now, later filter by logged-in user)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("usage_logs").select("*").order("date", { ascending: false });

  if (error) {
    console.error("Error fetching usage logs:", error);
    return res.status(500).json({ error: "Failed to fetch usage logs" });
  }

  res.json(data);
});

export default router;
