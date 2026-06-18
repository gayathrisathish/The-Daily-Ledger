import type { EditionOutput } from "@/lib/ai/types";

export function buildFinanceSchoolPrompt(edition: EditionOutput): string {
  return `You are a finance instructor. Generate ONLY valid JSON with no markdown. Schema: { "title": string, "definition": string, "simpleExample": string, "whyProfessionalsCare": string, "whyYouSawItToday": string }\n\nEdition mood: ${edition.marketMood}\nCompanyWatch: ${edition.companyWatch}\n\nChoose one key finance concept from today's news that explains the market move.`;
}
