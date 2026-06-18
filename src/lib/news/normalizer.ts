import type { NewsItem, RawFeedItem } from "./types";

const decodeEntities = (text: string): string => {
  return text.replace(/&(#?\w+);/g, (_, entity) => {
    if (entity.startsWith("#x") || entity.startsWith("#X")) {
      return String.fromCodePoint(parseInt(entity.slice(2), 16) || 0);
    }

    if (entity.startsWith("#")) {
      return String.fromCodePoint(parseInt(entity.slice(1), 10) || 0);
    }

    switch (entity) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      case "apos":
        return "'";
      case "nbsp":
        return " ";
      default:
        return `&${entity};`;
    }
  });
};

const cleanText = (value: string | undefined): string => {
  if (!value) {
    return "";
  }

  const withoutHtml = decodeEntities(value.replace(/<[^>]*>/g, " "));
  const collapsedWhitespace = withoutHtml.replace(/\s+/g, " ").trim();

  return collapsedWhitespace;
};

const normalizeDate = (value: string | undefined): string => {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
};

const normalizeUrl = (value: string | undefined): string => {
  if (!value) {
    return "";
  }

  try {
    const url = new URL(value.trim());
    url.searchParams.forEach((_, key) => {
      if (key.startsWith("utm_") || key === "ref" || key === "source" || key === "fbclid" || key === "gclid") {
        url.searchParams.delete(key);
      }
    });
    return url.toString();
  } catch {
    return value.trim();
  }
};

const buildSummary = (item: RawFeedItem): string => {
  const candidate = item.summary || item.description || item.title || "";
  const cleaned = cleanText(candidate);

  if (cleaned.length <= 240) {
    return cleaned;
  }

  return `${cleaned.slice(0, 237).trim()}...`;
};

export function normalizeArticle(item: RawFeedItem): NewsItem | null {
  const title = cleanText(item.title);
  const summary = buildSummary(item);
  const url = normalizeUrl(item.url ?? item.link);
  const publishedAt = normalizeDate(item.pubDate ?? item.published ?? item.updated);

  if (!title || !url) {
    return null;
  }

  return {
    id: `${item.source.id}:${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "-")}:${publishedAt}`,
    title,
    summary,
    url,
    source: item.source.name,
    category: item.source.category,
    publishedAt
  };
}

export function normalizeArticles(items: RawFeedItem[]): NewsItem[] {
  return items
    .map(normalizeArticle)
    .filter((article): article is NewsItem => article !== null);
}
