import type { RankedNewsItem } from "@/lib/news/types";

export function buildEditionPrompt(topStories: RankedNewsItem[]): string {
  const stories = topStories.slice(0, 6).map((story, i) => `Story ${i + 1}: ${story.title}`).join("\n");
  return `You are an editorial AI. Generate ONLY valid JSON with no markdown. Schema: { "marketMood": string, "readingTime": string, "topStories": [{ "headline": string, "whatHappened": string, "whyItMatters": string, "beginnerTranslation": string }], "bigStory": { "headline": string, "whatHappened": string, "whyItMatters": string, "beginnerTranslation": string }, "companyWatch": string, "whatToWatch": string }\n\nStories:\n${stories}\n\nCreate an edition with market mood, reading time estimate, top stories with analysis, a big story, company watch notes, and what to watch.`;
}
