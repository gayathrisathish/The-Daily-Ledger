import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { RankedNewsItem } from "./types";

export async function saveNewsCache(stories: RankedNewsItem[]): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const payload = stories.map((story) => ({
    id: story.id,
    title: story.title,
    summary: story.summary,
    url: story.url,
    source: story.source,
    category: story.category,
    published_at: story.publishedAt,
    score: story.totalScore
  }));

  const { error } = await supabase.from("news_cache").upsert(payload, { onConflict: ["id"] });

  if (error) {
    throw error;
  }
}

export async function getNewsCache(): Promise<RankedNewsItem[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("news_cache")
    .select<{
      id: string;
      title: string;
      summary: string;
      url: string;
      source: string;
      category: string;
      published_at: string;
      score: number;
    }>("*")
    .order("score", { ascending: false })
    .limit(20);

  if (error) {
    throw error;
  }

  return (
    data ?? []
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
