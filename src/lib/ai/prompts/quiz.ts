import type { EditionOutput } from "@/lib/ai/types";

export function buildQuizPrompt(edition: EditionOutput): string {
  return `You are a quiz writer. Generate ONLY valid JSON with no markdown. Schema: { "questions": [{ "question": string, "options": [string, string, string, string], "correctAnswer": string, "explanation": string }] }\n\nCreate exactly 6 multiple-choice questions based on the edition. Market mood: ${edition.marketMood}. Company watch: ${edition.companyWatch}.`;
}
