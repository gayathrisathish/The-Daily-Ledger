import { createClient } from "@supabase/supabase-js";

import { env } from "@/lib/env";
import type { Database } from "@/types/database";

let adminClient: ReturnType<typeof createClient<Database>> | null = null;

export function createSupabaseAdminClient() {
  if (adminClient) {
    return adminClient;
  }

  const key = env.supabaseServiceRoleKey || env.supabaseAnonKey;

  if (!env.supabaseUrl || !key) {
    throw new Error("Supabase credentials are not configured");
  }

  adminClient = createClient<Database>(env.supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return adminClient;
}

export function isUsingServiceRole(): boolean {
  return Boolean(env.supabaseServiceRoleKey);
}
