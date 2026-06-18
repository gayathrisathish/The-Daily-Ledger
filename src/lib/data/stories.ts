import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { StoryRecord, Database } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<StoryRecord>("stories").select("*").order("story_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<StoryRecord>("stories").select("*").eq("id", id).limit(1).single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function getByEditionId(editionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from<StoryRecord>("stories")
    .select("*")
    .eq("edition_id", editionId)
    .order("story_order", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createStory(data: Database["public"]["Tables"]["stories"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("stories").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateStory(id: string, updates: Database["public"]["Tables"]["stories"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("stories").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteStory(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("stories").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
