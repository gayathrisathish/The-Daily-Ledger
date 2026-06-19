import { getAiProvider } from "@/lib/ai/provider";
import type { EditorialPayload } from "@/lib/ai/service";
import { clearPipelineLogs, getPipelineLogs, pipelineLog } from "@/lib/pipeline/logger";
import { createEditionWithDependencies } from "@/lib/data/ai";
import { curateStories, ensureRankedStories } from "@/lib/news/curator";
import type { RankedNewsItem } from "@/lib/news/types";

export type GenerateEditionResult = EditorialPayload & {
  pipelineLogs: ReturnType<typeof getPipelineLogs>;
  rankedStoriesUsed: number;
};

export async function runGenerateEditionPipeline(): Promise<GenerateEditionResult> {
  clearPipelineLogs();

  pipelineLog("articles_fetched", "Starting Generate Edition pipeline");

  const curated = await curateStories({ persistCache: true });
  let topStories: RankedNewsItem[] = curated.topStories;

  if (topStories.length === 0) {
    pipelineLog("ranked_stories_loaded", "No stories from live fetch — checking news_cache");
    topStories = await ensureRankedStories();
  }

  if (topStories.length === 0) {
    throw new Error("No ranked stories available after fetch, ranking, and cache fallback.");
  }

  pipelineLog("ranked_stories_loaded", "Ranked stories ready for AI generation", { count: topStories.length });

  const provider = getAiProvider();

  pipelineLog("ai_generation_started", "AI editorial generation started", { storyCount: topStories.length });

  const edition = await provider.generateEdition({ topStories });
  const concept = await provider.generateFinanceConcept({ edition });
  const quiz = await provider.generateQuiz({ edition });
  const flashcards = await provider.generateFlashcards({ edition });
  const glossary = await provider.generateGlossary({ edition });

  pipelineLog("ai_generation_completed", "AI editorial generation completed", {
    stories: edition.topStories.length,
    quizQuestions: quiz.questions.length,
    flashcards: flashcards.length,
    glossaryTerms: glossary.length
  });

  const saved = await createEditionWithDependencies({ edition, concept, quiz, flashcards, glossary });

  pipelineLog("edition_saved", "Generate Edition pipeline completed successfully", {
    editionId: saved.editionId
  });

  return {
    ...(saved as EditorialPayload),
    pipelineLogs: getPipelineLogs(),
    rankedStoriesUsed: topStories.length
  };
}
