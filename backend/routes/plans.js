import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("plans").select("*").order("id", { ascending: true });
    if (error) throw error;
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("GET /plans error:", err);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

export default router;
