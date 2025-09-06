import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// Get all plans
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("plans").select("*");
  if (error) {
    console.error("Error fetching plans:", error);
    return res.status(500).json({ error: "Failed to fetch plans" });
  }
  res.json(data);
});

export default router;
