import express from "express";
import { supabase } from "../db/supabase.js";

const router = express.Router();

// Get payments (all users for now, later filter by logged-in user)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("payments").select("*").order("date", { ascending: false });

  if (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }

  res.json(data);
});

export default router;
