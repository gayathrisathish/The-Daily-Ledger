import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CompanyRecord, Database } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<CompanyRecord>("companies").select("*").order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<CompanyRecord>("companies").select("*").eq("id", id).limit(1).single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function createCompany(data: Database["public"]["Tables"]["companies"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("companies").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateCompany(id: string, updates: Database["public"]["Tables"]["companies"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("companies").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteCompany(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("companies").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
