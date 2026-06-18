export interface NewsSource {
  id: string;
  name: string;
  query: string;
  category: string;
  maxResults?: number;
}

export interface RawFeedItem {
  title?: string;
  description?: string;
  summary?: string;
  link?: string;
  url?: string;
  pubDate?: string;
  published?: string;
  updated?: string;
  source: NewsSource;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  publishedAt: string;
}

export interface RankedNewsItem extends NewsItem {
  marketImpactScore: number;
  indiaRelevanceScore: number;
  educationalValueScore: number;
  recencyScore: number;
  totalScore: number;
}

export interface NewsSourceStatus {
  source: NewsSource;
  status: "ok" | "failed" | "empty";
  fetchedArticles: number;
  error?: string;
}

export interface CuratedNewsResult {
  sourceStatuses: NewsSourceStatus[];
  rawStories: NewsItem[];
  deduplicatedStories: NewsItem[];
  rankedStories: RankedNewsItem[];
  topStories: RankedNewsItem[];
}
