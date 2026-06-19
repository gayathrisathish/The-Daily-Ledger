import { env } from "@/lib/env";
import { pipelineLog } from "@/lib/pipeline/logger";
import { newsSources } from "./sources";
import type { NewsSource, NewsSourceStatus, RawFeedItem } from "./types";

const GNEWS_API_URL = "https://gnews.io/api/v4/search";

type GNewsArticle = {
  title?: string;
  description?: string;
  content?: string;
  url?: string;
  publishedAt?: string;
};

type GNewsResponse = {
  totalArticles?: number;
  articles?: GNewsArticle[];
};

const mapGNewsArticle = (article: GNewsArticle, source: NewsSource): RawFeedItem | null => {
  const title = article.title?.trim();
  const description = article.description?.trim() ?? article.content?.trim();
  const link = article.url?.trim();
  const publishedAt = article.publishedAt?.trim();

  if (!title || !link) {
    return null;
  }

  return {
    title,
    description,
    summary: description,
    link,
    url: link,
    pubDate: publishedAt,
    published: publishedAt,
    updated: publishedAt,
    source
  };
};

const safeFetchJson = async (url: string): Promise<GNewsResponse> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      const message = await response.text().catch(() => "");
      throw new Error(message ? `HTTP ${response.status}: ${message}` : `HTTP ${response.status}`);
    }

    return (await response.json()) as GNewsResponse;
  } finally {
    clearTimeout(timeout);
  }
};

export async function fetchSource(source: NewsSource): Promise<{ status: NewsSourceStatus; items: RawFeedItem[] }> {
  try {
    if (!env.gnewsApiKey) {
      throw new Error("GNEWS_API_KEY is not set");
    }

    const url = new URL(GNEWS_API_URL);
    url.searchParams.set("q", source.query);
    url.searchParams.set("lang", "en");
    url.searchParams.set("sortby", "publishedAt");
    url.searchParams.set("max", String(source.maxResults ?? 5));
    url.searchParams.set("apikey", env.gnewsApiKey);

    const parsed = await safeFetchJson(url.toString());
    const items: RawFeedItem[] = (parsed.articles ?? []).flatMap((article) => {
      const mapped = mapGNewsArticle(article, source);
      return mapped ? [mapped] : [];
    });

    pipelineLog("articles_fetched", `Source ${source.name} fetched`, {
      sourceId: source.id,
      articleCount: items.length
    });

    return {
      status: {
        source,
        status: items.length > 0 ? "ok" : "empty",
        fetchedArticles: items.length
      },
      items
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    pipelineLog("articles_fetched", `Source ${source.name} failed`, {
      sourceId: source.id,
      error: message
    });

    return {
      status: {
        source,
        status: "failed",
        fetchedArticles: 0,
        error: message
      },
      items: []
    };
  }
}

export async function fetchAllSources(): Promise<Array<{ status: NewsSourceStatus; items: RawFeedItem[] }>> {
  const results = await Promise.allSettled(newsSources.map((source) => fetchSource(source)));

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }

    return {
      status: {
        source: newsSources[index],
        status: "failed",
        fetchedArticles: 0,
        error: result.reason instanceof Error ? result.reason.message : String(result.reason)
      },
      items: []
    };
  });
}
