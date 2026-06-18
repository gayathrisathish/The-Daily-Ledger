import { fetchAllSources } from "./rss";
import { normalizeArticles } from "./normalizer";
import { deduplicateStories } from "./deduplicator";
import { scoreStory } from "./ranker";
import { saveNewsCache, getNewsCache } from "./cache";
import type { CuratedNewsResult, NewsItem, RankedNewsItem } from "./types";

export async function curateStories(): Promise<CuratedNewsResult> {
  const fetchedResults = await fetchAllSources();
  const rawStories = fetchedResults.flatMap((result) => normalizeArticles(result.items));
  const deduplicatedStories = deduplicateStories(rawStories);
  const rankedStories = deduplicatedStories.map(scoreStory).sort((a, b) => b.totalScore - a.totalScore || b.publishedAt.localeCompare(a.publishedAt));
  const topStories = rankedStories.slice(0, 20);

  try {
    await saveNewsCache(topStories);
  } catch {
    // Keep going even when cache save fails.
  }

  return {
    sourceStatuses: fetchedResults.map((result) => result.status),
    rawStories,
    deduplicatedStories,
    rankedStories,
    topStories
  };
}

export async function getCachedStories(): Promise<RankedNewsItem[]> {
  const cached = await getNewsCache();
  return cached;
}
