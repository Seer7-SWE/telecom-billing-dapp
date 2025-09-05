import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET payments
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("payments").select("*").order("date", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST payment
router.post("/", async (req, res) => {
  const { data, error } = await supabase.from("payments").insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

export default router;
