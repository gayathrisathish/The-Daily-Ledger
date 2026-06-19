import { fetchAllSources } from "./rss";
import { normalizeArticles } from "./normalizer";
import { deduplicateStories } from "./deduplicator";
import { scoreStory } from "./ranker";
import { saveNewsCache, getNewsCache } from "./cache";
import { pipelineLog } from "@/lib/pipeline/logger";
import type { CuratedNewsResult, NewsItem, RankedNewsItem } from "./types";

type CurateOptions = {
  persistCache?: boolean;
};

export async function curateStories(options: CurateOptions = {}): Promise<CuratedNewsResult> {
  const { persistCache = true } = options;

  const fetchedResults = await fetchAllSources();
  const totalFetched = fetchedResults.reduce((sum, result) => sum + result.items.length, 0);

  pipelineLog("articles_fetched", "GNews articles fetched", {
    sources: fetchedResults.length,
    totalArticles: totalFetched,
    okSources: fetchedResults.filter((r) => r.status.status === "ok").length,
    failedSources: fetchedResults.filter((r) => r.status.status === "failed").length
  });

  const rawStories = fetchedResults.flatMap((result) => normalizeArticles(result.items));
  const deduplicatedStories = deduplicateStories(rawStories);
  const rankedStories = deduplicatedStories
    .map(scoreStory)
    .sort((a, b) => b.totalScore - a.totalScore || b.publishedAt.localeCompare(a.publishedAt));
  const topStories = rankedStories.slice(0, 20);

  pipelineLog("articles_ranked", "Stories ranked", {
    rawCount: rawStories.length,
    deduplicatedCount: deduplicatedStories.length,
    rankedCount: rankedStories.length,
    topCount: topStories.length
  });

  if (persistCache) {
    try {
      await saveNewsCache(topStories);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      pipelineLog("articles_stored", "Cache save failed — ranked stories remain in memory", { error: message });
    }
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
  return getNewsCache();
}

export async function ensureRankedStories(): Promise<RankedNewsItem[]> {
  const cached = await getNewsCache();

  if (cached.length > 0) {
    return cached;
  }

  pipelineLog("ranked_stories_loaded", "news_cache empty — fetching and ranking stories");
  const curated = await curateStories({ persistCache: true });

  if (curated.topStories.length > 0) {
    return curated.topStories;
  }

  return getNewsCache();
}
