import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { FlashcardRecord, Database } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<FlashcardRecord>("flashcards").select("*").order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<FlashcardRecord>("flashcards").select("*").eq("id", id).limit(1).single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function getByEditionId(editionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from<FlashcardRecord>("flashcards")
    .select("*")
    .eq("edition_id", editionId)
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createFlashcard(data: Database["public"]["Tables"]["flashcards"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("flashcards").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateFlashcard(id: string, updates: Database["public"]["Tables"]["flashcards"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("flashcards").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteFlashcard(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("flashcards").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
