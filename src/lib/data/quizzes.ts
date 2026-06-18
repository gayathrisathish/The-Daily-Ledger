import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { QuizRecord, QuizQuestionRecord, Database } from "@/types/database";

export async function get() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<QuizRecord>("quizzes").select("*").order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from<QuizRecord>("quizzes").select("*").eq("id", id).limit(1).single();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  return data ?? null;
}

export async function getByEditionId(editionId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from<QuizRecord>("quizzes")
    .select("*")
    .eq("edition_id", editionId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getQuestionsByQuizId(quizId: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from<QuizQuestionRecord>("quiz_questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("position", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function createQuiz(data: Database["public"]["Tables"]["quizzes"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quizzes").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateQuiz(id: string, updates: Database["public"]["Tables"]["quizzes"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quizzes").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteQuiz(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quizzes").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function createQuestion(data: Database["public"]["Tables"]["quiz_questions"]["Insert"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quiz_questions").insert(data);

  if (error) {
    throw error;
  }
}

export async function updateQuestion(id: string, updates: Database["public"]["Tables"]["quiz_questions"]["Update"]) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quiz_questions").update(updates).eq("id", id);

  if (error) {
    throw error;
  }
}

export async function deleteQuestion(id: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("quiz_questions").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
