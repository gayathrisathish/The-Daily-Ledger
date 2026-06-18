import { modelConfig } from "@/lib/ai/config";
import { executeOpenRouterRequest } from "@/lib/ai/providers/openrouter";
import type { AIProvider, EditionOutput, FinanceConcept, FlashcardEntry, GlossaryEntry, GenerateEditionInput, GenerateFinanceConceptInput, GenerateFlashcardsInput, GenerateGlossaryInput, GenerateQuizInput, QuizOutput } from "@/lib/ai/types";
import { buildEditionPrompt } from "@/lib/ai/prompts/edition";
import { buildFinanceSchoolPrompt } from "@/lib/ai/prompts/finance-school";
import { buildQuizPrompt } from "@/lib/ai/prompts/quiz";
import { buildFlashcardsPrompt } from "@/lib/ai/prompts/flashcards";
import { buildGlossaryPrompt } from "@/lib/ai/prompts/glossary";
import { parseJsonResponse } from "@/lib/ai/service";

export class GeminiProvider implements AIProvider {
  readonly key = "gemini";

  private get config() {
    return modelConfig.gemini;
  }

  async generateEdition(input: GenerateEditionInput): Promise<EditionOutput> {
    const prompt = buildEditionPrompt(input.topStories);
    const raw = await executeOpenRouterRequest({
      provider: this.config.provider,
      model: this.config.model,
      prompt,
      temperature: 0.2,
      maxTokens: 1500
    });

    return parseJsonResponse<EditionOutput>(raw, "edition");
  }

  async generateFinanceConcept(input: GenerateFinanceConceptInput): Promise<FinanceConcept> {
    const prompt = buildFinanceSchoolPrompt(input.edition);
    const raw = await executeOpenRouterRequest({
      provider: this.config.provider,
      model: this.config.model,
      prompt,
      temperature: 0.25,
      maxTokens: 800
    });

    return parseJsonResponse(raw, "financeConcept");
  }

  async generateQuiz(input: GenerateQuizInput): Promise<QuizOutput> {
    const prompt = buildQuizPrompt(input.edition);
    const raw = await executeOpenRouterRequest({
      provider: this.config.provider,
      model: this.config.model,
      prompt,
      temperature: 0.3,
      maxTokens: 1200
    });

    return parseJsonResponse<QuizOutput>(raw, "quiz");
  }

  async generateFlashcards(input: GenerateFlashcardsInput): Promise<FlashcardEntry[]> {
    const prompt = buildFlashcardsPrompt(input.edition);
    const raw = await executeOpenRouterRequest({
      provider: this.config.provider,
      model: this.config.model,
      prompt,
      temperature: 0.3,
      maxTokens: 1100
    });

    return parseJsonResponse(raw, "flashcards");
  }

  async generateGlossary(input: GenerateGlossaryInput): Promise<GlossaryEntry[]> {
    const prompt = buildGlossaryPrompt(input.edition);
    const raw = await executeOpenRouterRequest({
      provider: this.config.provider,
      model: this.config.model,
      prompt,
      temperature: 0.3,
      maxTokens: 900
    });

    return parseJsonResponse(raw, "glossary");
  }
}
