import { z } from "zod";
import type { EditionOutput, FinanceConcept, FlashcardEntry, GlossaryEntry, QuizOutput } from "@/lib/ai/types";

const storySchema = z.object({
  headline: z.string().min(1),
  whatHappened: z.string().min(1),
  whyItMatters: z.string().min(1),
  beginnerTranslation: z.string().min(1)
});

const editionSchema = z.object({
  marketMood: z.string().min(1),
  readingTime: z.string().min(1),
  topStories: z.array(storySchema).min(1),
  bigStory: storySchema,
  companyWatch: z.string().min(1),
  whatToWatch: z.string().min(1)
});

const financeConceptSchema = z.object({
  title: z.string().min(1),
  definition: z.string().min(1),
  simpleExample: z.string().min(1),
  whyProfessionalsCare: z.string().min(1),
  whyYouSawItToday: z.string().min(1)
});

const quizQuestionSchema = z.object({
  question: z.string().min(1),
  options: z.array(z.string().min(1)).length(4),
  correctAnswer: z.string().min(1),
  explanation: z.string().min(1)
});

const quizSchema = z.object({
  questions: z.array(quizQuestionSchema).length(6)
});

const flashcardSchema = z.object({
  front: z.string().min(1),
  back: z.string().min(1),
  category: z.string().min(1)
});

const glossarySchema = z.array(
  z.object({
    term: z.string().min(1),
    definition: z.string().min(1),
    simpleExplanation: z.string().min(1)
  })
).min(3).max(5);

export function parseJsonResponse<T>(raw: string, type: "edition" | "financeConcept" | "quiz" | "flashcards" | "glossary"): T {
  const sanitized = raw.trim().replace(/^[^\{\[]+/, "").replace(/[^\}\]]+$/, "");

  let parsed: unknown;
  try {
    parsed = JSON.parse(sanitized);
  } catch (error) {
    throw new Error(`AI returned invalid JSON for ${type}: ${(error as Error).message}`);
  }

  switch (type) {
    case "edition":
      return editionSchema.parse(parsed) as T;
    case "financeConcept":
      return financeConceptSchema.parse(parsed) as T;
    case "quiz":
      return quizSchema.parse(parsed) as T;
    case "flashcards":
      return z.array(flashcardSchema).length(10).parse(parsed) as T;
    case "glossary":
      return glossarySchema.parse(parsed) as T;
    default:
      throw new Error(`Unsupported response type: ${type}`);
  }
}

export type EditorialPayload = {
  edition: EditionOutput;
  concept: FinanceConcept;
  quiz: QuizOutput;
  flashcards: FlashcardEntry[];
  glossary: GlossaryEntry[];
};
