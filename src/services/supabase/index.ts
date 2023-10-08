import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseApi = process.env.VITE_SUPABASE_API;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseApi as string
);
