// backend/routes/payments.js
import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";

const router = express.Router();

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get the Supabase client
    const supabase = getSupabaseClient();
    
    // Query the "payments" table, ordering by date in descending order
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .order("date", { ascending: false });
    
    if (error) {
      console.error("Supabase (payments) error:", error);
      return res.status(500).json({ error: error.message });
    }
    
    // Ensure data is returned as an array, or an empty array if no data
    return res.json(Array.isArray(data) ? data : []);
    
  } catch (err) {
    // Catch any exceptions
    console.error("Exception in /payments:", err);
    return res.status(500).json({ error: "Failed to fetch payments" });
  }
});

export default router;