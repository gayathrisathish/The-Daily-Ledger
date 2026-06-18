import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";
import type { RankedNewsItem } from "./types";

export async function saveNewsCache(stories: RankedNewsItem[]): Promise<void> {
  const supabase = await createSupabaseServerClient();
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

  const { error } = await (supabase.from("news_cache") as any).upsert(payload, { onConflict: "id" });

  if (error) {
    throw error;
  }
}

export async function getNewsCache(): Promise<RankedNewsItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("news_cache")
    .select("*")
    .order("score", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  const records = (data ?? []) as Database["public"]["Tables"]["news_cache"]["Row"][];

  return (
    records
  ).map((item) => ({
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
