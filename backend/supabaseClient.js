// backend/db/supabase.js
import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("⚠️ Supabase env vars missing (SUPABASE_URL / SUPABASE_KEY).");
  }

  return createClient(SUPABASE_URL, SUPABASE_KEY);
}
