import type { NewsItem } from "./types";

const normalizeComparison = (value: string): string => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const jaccardSimilarity = (left: string, right: string): number => {
  const leftWords = new Set(left.split(" ").filter(Boolean));
  const rightWords = new Set(right.split(" ").filter(Boolean));

  if (leftWords.size === 0 || rightWords.size === 0) {
    return 0;
  }

  const intersection = new Set([...leftWords].filter((word) => rightWords.has(word)));
  const union = new Set([...leftWords, ...rightWords]);

  return intersection.size / union.size;
};

const urlSimilarity = (urlA: string, urlB: string): boolean => {
  try {
    const parsedA = new URL(urlA);
    const parsedB = new URL(urlB);

    const cleanA = `${parsedA.hostname}${parsedA.pathname}`.replace(/\/+$/, "");
    const cleanB = `${parsedB.hostname}${parsedB.pathname}`.replace(/\/+$/, "");

    return cleanA === cleanB;
  } catch {
    return urlA === urlB;
  }
};

const headlineSimilarity = (titleA: string, titleB: string): number => {
  return jaccardSimilarity(normalizeComparison(titleA), normalizeComparison(titleB));
};

const chooseBetterStory = (first: NewsItem, second: NewsItem): NewsItem => {
  if (first.summary.length >= second.summary.length) {
    return first;
  }

  return second;
};

export function deduplicateStories(items: NewsItem[]): NewsItem[] {
  const uniqueStories: NewsItem[] = [];

  items.forEach((item) => {
    const duplicateIndex = uniqueStories.findIndex((existing) => {
      const titleSimilarity = headlineSimilarity(existing.title, item.title);
      const sameUrl = urlSimilarity(existing.url, item.url);

      return sameUrl || titleSimilarity >= 0.65;
    });

    if (duplicateIndex === -1) {
      uniqueStories.push(item);
      return;
    }

    uniqueStories[duplicateIndex] = chooseBetterStory(uniqueStories[duplicateIndex], item);
  });

  return uniqueStories;
}
