import type { EditionOutput } from "@/lib/ai/types";

export function buildFlashcardsPrompt(edition: EditionOutput): string {
  return `You are a flashcard writer. Generate ONLY valid JSON array with no markdown. Schema: [{ "front": string, "back": string, "category": string }]\n\nCreate exactly 10 flashcards from the edition. Market mood: ${edition.marketMood}. Company watch: ${edition.companyWatch}.`;
}
