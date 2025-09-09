// backend/db/supabase.js
import "dotenv/config"; // safe; will just load .env locally
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.warn("⚠️ Supabase env vars missing (SUPABASE_URL / SUPABASE_KEY).");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
