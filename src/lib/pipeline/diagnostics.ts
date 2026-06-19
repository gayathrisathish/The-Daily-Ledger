import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pipelineLog } from "@/lib/pipeline/logger";

export type PipelineDiagnostics = {
  rawStoriesCount: number | null;
  rankedStoriesCount: number;
  editionsCount: number;
  quizzesCount: number;
  flashcardsCount: number;
  glossaryCount: number;
  rawStoriesNote: string;
};

async function countTable(table: "news_cache" | "editions" | "quizzes" | "flashcards" | "glossary"): Promise<number> {
  const supabase = createSupabaseAdminClient();
  const { count, error } = await supabase.from(table).select("*", { count: "exact", head: true });

  if (error) {
    pipelineLog("ranked_stories_loaded", `Failed to count ${table}`, { error: error.message });
    throw error;
  }

  return count ?? 0;
}

export async function getPipelineDiagnostics(): Promise<PipelineDiagnostics> {
  const [rankedStoriesCount, editionsCount, quizzesCount, flashcardsCount, glossaryCount] = await Promise.all([
    countTable("news_cache"),
    countTable("editions"),
    countTable("quizzes"),
    countTable("flashcards"),
    countTable("glossary")
  ]);

  return {
    rawStoriesCount: null,
    rankedStoriesCount,
    editionsCount,
    quizzesCount,
    flashcardsCount,
    glossaryCount,
    rawStoriesNote: "Raw stories are not persisted in Supabase. They exist only during the curation step before ranking into news_cache."
  };
}
