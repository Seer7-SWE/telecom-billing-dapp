import express from "express";
import { getSupabaseClient } from "../supabaseClient.js";


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Get the Supabase client
    const supabase = getSupabaseClient();
    
    // Query the "usage_logs" table and order by date in descending order
    const { data, error } = await supabase
      .from("usage_logs")
      .select("*")
      .order("date", { ascending: false });
    
    if (error) {
      console.error("Supabase (usage) error:", error);
      return res.status(500).json({ error: error.message });
    }
    
    // Ensure data is returned as an array, or an empty array if no data
    return res.json(Array.isArray(data) ? data : []);
    
  } catch (err) {
    // Catch any exceptions
    console.error("Exception in /usage:", err);
    return res.status(500).json({ error: "Failed to fetch usage logs" });
  }
});
