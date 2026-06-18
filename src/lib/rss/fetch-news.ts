import { XMLParser } from "fast-xml-parser";

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  publishedAt: string;
  summary: string;
}

export async function fetchRssFeed(sourceName: string, url: string): Promise<NewsItem[]> {
  const response = await fetch(url, {
    headers: {
      "user-agent": "The Daily Ledger"
    },
    next: {
      revalidate: 300
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch RSS feed for ${sourceName}`);
  }

  const xml = await response.text();
  const parser = new XMLParser({ ignoreAttributes: false, trimValues: true });
  const parsed = parser.parse(xml);
  const items = Array.isArray(parsed?.rss?.channel?.item)
    ? parsed.rss.channel.item
    : parsed?.rss?.channel?.item
      ? [parsed.rss.channel.item]
      : [];

  return items.map((item: Record<string, string>) => ({
    title: item.title ?? sourceName,
    link: item.link ?? url,
    source: sourceName,
    publishedAt: item.pubDate ?? new Date().toISOString(),
    summary: item.description ?? ""
  }));
}
