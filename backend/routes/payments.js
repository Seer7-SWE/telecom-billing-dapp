import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";


router.get("/", async (req, res) => {
  try {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("date", { ascending: false });
    if (error) throw error;
    res.json(Array.isArray(data) ? data : []);
  } catch (err) {
    console.error("GET /payments error:", err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;
