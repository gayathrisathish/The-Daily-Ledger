import type { RankedNewsItem, NewsItem } from "./types";

const topicWeights = new Map<string, number>([
  ["interest rate", 1.0],
  ["rates", 0.9],
  ["fed", 1.0],
  ["rbi", 1.0],
  ["inflation", 0.95],
  ["gdp", 0.9],
  ["oil", 0.85],
  ["crude", 0.8],
  ["bank", 0.7],
  ["federal reserve", 1.0],
  ["repo rate", 1.0],
  ["policy rate", 0.95],
  ["consumer price", 0.8],
  ["cpi", 0.8],
  ["industrial production", 0.75],
  ["markets", 0.7],
  ["economic", 0.7],
  ["equity", 0.65],
  ["assets", 0.65]
]);

const indiaKeywords = ["rbi", "sebi", "india", "indian", "rupee", "bps", "gdp", "inflation", "mumbai", "mca", "nifty", "sensex", "reserve bank"];
const educationalKeywords = ["why", "explain", "understand", "guide", "what it means", "makes sense", "how", "impact", "implication", "meaning"];
const lowPriorityKeywords = ["celebrity", "bollywood", "movie", "entertainment", "sport", "sports", "movie", "film", "cricket", "dismissal", "gossip"];

const scoreText = (text: string, terms: string[]): number => {
  const normalized = text.toLowerCase();
  return terms.reduce((score, term) => (normalized.includes(term) ? score + 1 : score), 0);
};

const scoreForTopics = (text: string): number => {
  const normalized = text.toLowerCase();
  let score = 0;

  topicWeights.forEach((weight, keyword) => {
    if (normalized.includes(keyword)) {
      score += weight;
    }
  });

  return Math.min(score, 4);
};

const computeRecencyScore = (publishedAt: string): number => {
  const published = new Date(publishedAt).getTime();
  if (Number.isNaN(published)) {
    return 0;
  }

  const ageHours = (Date.now() - published) / 3600000;

  if (ageHours < 3) {
    return 1;
  }

  if (ageHours < 12) {
    return 0.85;
  }

  if (ageHours < 24) {
    return 0.7;
  }

  if (ageHours < 48) {
    return 0.5;
  }

  return 0.25;
};

const clamp = (value: number, min = 0, max = 1): number => Math.min(max, Math.max(min, value));

export function scoreStory(article: NewsItem): RankedNewsItem {
  const text = `${article.title} ${article.summary}`;

  const marketImpactScore = clamp(scoreForTopics(text) / 4);
  const indiaRelevanceScore = clamp(scoreText(text, indiaKeywords) / 4);
  const educationalValueScore = clamp(scoreText(text, educationalKeywords) / 2);
  const recencyScore = clamp(computeRecencyScore(article.publishedAt));
  const penalty = clamp(scoreText(text, lowPriorityKeywords) * 0.2);

  const totalScore = clamp(
    marketImpactScore * 0.35 + indiaRelevanceScore * 0.25 + educationalValueScore * 0.2 + recencyScore * 0.2 - penalty
  );

  return {
    ...article,
    marketImpactScore,
    indiaRelevanceScore,
    educationalValueScore,
    recencyScore,
    totalScore
  };
}
