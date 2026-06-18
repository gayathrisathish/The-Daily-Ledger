import type { EditionOutput } from "@/lib/ai/types";

export function buildGlossaryPrompt(edition: EditionOutput): string {
  return `You are a glossary writer. Generate ONLY valid JSON array with no markdown. Schema: [{ "term": string, "definition": string, "simpleExplanation": string }]\n\nDefine 3-5 key financial terms from the edition. Market mood: ${edition.marketMood}. Company watch: ${edition.companyWatch}.`;
}
