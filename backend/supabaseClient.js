// backend/db/supabase.js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY in process.env");
  throw new Error("Missing SUPABASE_URL / SUPABASE_KEY environment variables");
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  
}
