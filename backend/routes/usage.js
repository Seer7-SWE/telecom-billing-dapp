import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";
import * as mock from "../mockBlockchain.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    console.log("Testing connection:", process.env.SUPABASE_URL);
    const { data, error } = await supabase.from("usage_logs").select("*");
    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error("Catch block error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


export default router;
