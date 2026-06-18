import type { RankedNewsItem } from "@/lib/news/types";

export type AIProviderKey = "gemini" | "deepseek" | "qwen";

export interface EditionStory {
  headline: string;
  whatHappened: string;
  whyItMatters: string;
  beginnerTranslation: string;
}

export interface EditionOutput {
  marketMood: string;
  readingTime: string;
  topStories: EditionStory[];
  bigStory: EditionStory;
  companyWatch: string;
  whatToWatch: string;
}

export interface FinanceConcept {
  title: string;
  definition: string;
  simpleExample: string;
  whyProfessionalsCare: string;
  whyYouSawItToday: string;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
}

export interface QuizOutput {
  questions: QuizQuestion[];
}

export interface FlashcardEntry {
  front: string;
  back: string;
  category: string;
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  simpleExplanation: string;
}

export interface GenerateEditionInput {
  topStories: RankedNewsItem[];
}

export interface GenerateFinanceConceptInput {
  edition: EditionOutput;
}

export interface GenerateQuizInput {
  edition: EditionOutput;
}

export interface GenerateFlashcardsInput {
  edition: EditionOutput;
}

export interface GenerateGlossaryInput {
  edition: EditionOutput;
}

export interface AIProvider {
  readonly key: AIProviderKey;
  generateEdition(input: GenerateEditionInput): Promise<EditionOutput>;
  generateFinanceConcept(input: GenerateFinanceConceptInput): Promise<FinanceConcept>;
  generateQuiz(input: GenerateQuizInput): Promise<QuizOutput>;
  generateFlashcards(input: GenerateFlashcardsInput): Promise<FlashcardEntry[]>;
  generateGlossary(input: GenerateGlossaryInput): Promise<GlossaryEntry[]>;
}
