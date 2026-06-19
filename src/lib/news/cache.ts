import { createSupabaseAdminClient, isUsingServiceRole } from "@/lib/supabase/admin";
import { pipelineLog } from "@/lib/pipeline/logger";
import type { Database } from "@/types/database";
import type { RankedNewsItem } from "./types";

export async function saveNewsCache(stories: RankedNewsItem[]): Promise<void> {
  const supabase = createSupabaseAdminClient();
  const payload: Database["public"]["Tables"]["news_cache"]["Insert"][] = stories.map((story) => ({
    id: story.id,
    title: story.title,
    summary: story.summary,
    url: story.url,
    source: story.source,
    category: story.category,
    published_at: story.publishedAt,
    score: story.totalScore
  }));

  const { error: deleteError } = await supabase.from("news_cache").delete().neq("id", "");

  if (deleteError) {
    pipelineLog("articles_stored", "Failed to clear news_cache before insert", {
      error: deleteError.message,
      usingServiceRole: isUsingServiceRole()
    });
    throw deleteError;
  }

  if (payload.length === 0) {
    pipelineLog("articles_stored", "No stories to store in news_cache", { count: 0 });
    return;
  }

  const { error } = await supabase.from("news_cache").insert(payload);

  if (error) {
    pipelineLog("articles_stored", "Failed to insert into news_cache", {
      error: error.message,
      count: payload.length,
      usingServiceRole: isUsingServiceRole()
    });
    throw error;
  }

  pipelineLog("articles_stored", "Ranked stories saved to news_cache", {
    count: payload.length,
    usingServiceRole: isUsingServiceRole()
  });
}

export async function getNewsCache(): Promise<RankedNewsItem[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("news_cache")
    .select("*")
    .order("score", { ascending: false })
    .limit(20);

  if (error) {
    pipelineLog("ranked_stories_loaded", "Failed to read news_cache", { error: error.message });
    throw error;
  }

  const records = (data ?? []) as Database["public"]["Tables"]["news_cache"]["Row"][];

  pipelineLog("ranked_stories_loaded", "Ranked stories loaded from news_cache", { count: records.length });

  return records.map((item) => ({
    id: item.id,
    title: item.title,
    summary: item.summary,
    url: item.url,
    source: item.source,
    category: item.category,
    publishedAt: item.published_at,
    marketImpactScore: 0,
    indiaRelevanceScore: 0,
    educationalValueScore: 0,
    recencyScore: 0,
    totalScore: item.score
  }));
}

export async function getNewsCacheCount(): Promise<number> {
  const supabase = createSupabaseAdminClient();
  const { count, error } = await supabase.from("news_cache").select("*", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  return count ?? 0;
}
