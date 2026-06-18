import { XMLParser } from "fast-xml-parser";

import { newsSources } from "./sources";
import type { NewsSource, NewsItem, NewsSourceStatus, RawFeedItem } from "./types";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  allowBooleanAttributes: true,
  parseTagValue: true,
  trimValues: true
});

const safeFetch = async (url: string): Promise<string> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
};

const getStringField = (entry: Record<string, unknown>, key: string): string | undefined => {
  const value = entry[key];

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const objectValue = value as Record<string, unknown>;
    const text = objectValue["#text"] ?? objectValue["text"];

    if (typeof text === "string") {
      return text;
    }
  }

  return undefined;
};

const extractItems = (parsed: unknown, source: NewsSource): RawFeedItem[] => {
  if (typeof parsed !== "object" || parsed === null) {
    return [];
  }

  const feed = parsed as Record<string, unknown>;
  const channel = (feed.rss ?? feed.feed ?? feed.RDF ?? feed.items ?? feed.atom) as Record<string, unknown> | undefined;

  const itemCollection = channel?.channel?.item ?? channel?.entries ?? channel?.entry ?? feed?.item ?? feed?.entry;

  if (!itemCollection) {
    return [];
  }

  const items = Array.isArray(itemCollection) ? itemCollection : [itemCollection];

  return items.map((item) => {
    const entry = item as Record<string, unknown>;
    const title = getStringField(entry, "title");
    const description = getStringField(entry, "description") ?? getStringField(entry, "summary") ?? getStringField(entry, "content");
    const link = getStringField(entry, "link") ?? getStringField(entry, "url");
    const pubDate = getStringField(entry, "pubDate") ?? getStringField(entry, "published") ?? getStringField(entry, "updated");

    return {
      title,
      description,
      summary: description,
      link,
      url: link,
      pubDate,
      published: pubDate,
      updated: getStringField(entry, "updated"),
      source
    };
  });
};

export async function fetchSource(source: NewsSource): Promise<{ status: NewsSourceStatus; items: RawFeedItem[] }> {
  try {
    const body = await safeFetch(source.url);
    const parsed = parser.parse(body);
    const items = extractItems(parsed, source);

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
