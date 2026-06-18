import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database, EditionRecord, MarketSnapshotRecord } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("editions")
    .select("*")
    .order("edition_date", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("editions").select("*").eq("id", id).limit(1).single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    throw error;
  }

  return data;
}

export async function getLatestEdition() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("editions")
    .select("*")
    .order("edition_date", { ascending: false })
    .limit(1)
    .single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function getMarketSnapshotsByEdition(editionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from<MarketSnapshotRecord>("market_snapshots")
    .select("*")
    .eq("edition_id", editionId)
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createEdition(data: Database["public"]["Tables"]["editions"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("editions").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateEdition(id: string, updates: Database["public"]["Tables"]["editions"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("editions").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteEdition(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("editions").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
