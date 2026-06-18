import { getAiProvider } from "@/lib/ai/provider";
import type { EditorialPayload } from "@/lib/ai/service";
import { createEditionWithDependencies } from "@/lib/data/ai";
import { getCachedStories } from "@/lib/news/curator";

export async function generateDailyLedgerEdition(): Promise<EditorialPayload> {
  const provider = getAiProvider();
  const topStories = await getCachedStories();

  if (topStories.length === 0) {
    throw new Error("No ranked stories available for AI editorial generation.");
  }

  const edition = await provider.generateEdition({ topStories });
  const concept = await provider.generateFinanceConcept({ edition });
  const quiz = await provider.generateQuiz({ edition });
  const flashcards = await provider.generateFlashcards({ edition });
  const glossary = await provider.generateGlossary({ edition });

  const saved = await createEditionWithDependencies({ edition, concept, quiz, flashcards, glossary });

  return saved as EditorialPayload;
}
