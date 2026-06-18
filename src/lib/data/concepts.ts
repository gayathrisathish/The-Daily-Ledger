import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ConceptRecord, Database } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<ConceptRecord>("concepts").select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<ConceptRecord>("concepts").select("*").eq("id", id).limit(1).single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function createConcept(data: Database["public"]["Tables"]["concepts"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("concepts").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateConcept(id: string, updates: Database["public"]["Tables"]["concepts"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("concepts").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteConcept(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("concepts").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
