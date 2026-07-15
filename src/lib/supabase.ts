import { createClient } from "@supabase/supabase-js";

// Use placeholder strings during build time to prevent build failures when env variables are not yet injected.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn("WARNING: NEXT_PUBLIC_SUPABASE_URL is not set. Using placeholder for build.");
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Using placeholder for build.");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
