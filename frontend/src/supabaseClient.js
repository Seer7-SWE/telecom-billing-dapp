// frontend/src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("VITE SUPABASE env missing; check Netlify env variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
