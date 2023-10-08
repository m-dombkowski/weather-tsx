import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseApi = import.meta.env.VITE_SUPABASE_API;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseApi as string
);
