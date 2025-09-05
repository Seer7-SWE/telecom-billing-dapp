import express from "express";
import { supabase } from "../supabaseClient.js";

const router = express.Router();

// GET all plans
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("plans").select("*");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST new plan
router.post("/", async (req, res) => {
  const { data, error } = await supabase.from("plans").insert([req.body]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

export default router;
