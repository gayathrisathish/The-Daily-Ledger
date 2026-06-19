import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { pipelineLog } from "@/lib/pipeline/logger";
import type { Database } from "@/types/database";
import type { EditionOutput, FinanceConcept, FlashcardEntry, GlossaryEntry, QuizOutput } from "@/lib/ai/types";

export type SupabaseEditionPayload = {
  edition_date: string;
  market_mood: string;
  reading_time: string;
};

export async function createEditionWithDependencies(params: {
  edition: EditionOutput;
  concept: FinanceConcept;
  quiz: QuizOutput;
  flashcards: FlashcardEntry[];
  glossary: GlossaryEntry[];
}) {
  const supabase = createSupabaseAdminClient();
  const editionDate = new Date().toISOString().split("T")[0];

  const { data: existingEdition } = await supabase
    .from("editions")
    .select("id")
    .eq("edition_date", editionDate)
    .maybeSingle();

  if (existingEdition) {
    const { error: deleteError } = await supabase.from("editions").delete().eq("id", existingEdition.id);

    if (deleteError) {
      pipelineLog("edition_saved", "Failed to replace existing edition for today", { error: deleteError.message });
      throw deleteError;
    }

    pipelineLog("edition_saved", "Replaced existing edition for today", { editionDate });
  }

  const editionInsert: Database["public"]["Tables"]["editions"]["Insert"] = {
    edition_date: editionDate,
    market_mood: params.edition.marketMood,
    reading_time: params.edition.readingTime
  };

  const { data: editionData, error: editionError } = await supabase.from("editions").insert(editionInsert).select("id").single();
  if (editionError || !editionData) {
    pipelineLog("edition_saved", "Failed to create edition", { error: editionError?.message });
    throw editionError ?? new Error("Failed to create edition");
  }

  const editionId = editionData.id as string;
  pipelineLog("edition_saved", "Edition saved", { editionId, editionDate });

  const storyRecords = params.edition.topStories.map((story, index) => ({
    edition_id: editionId,
    headline: story.headline,
    what_happened: story.whatHappened,
    why_it_matters: story.whyItMatters,
    beginner_translation: story.beginnerTranslation,
    story_order: index + 1
  }));

  const { error: storiesError } = await supabase.from("stories").insert(storyRecords);
  if (storiesError) {
    pipelineLog("edition_saved", "Failed to save stories", { error: storiesError.message });
    throw storiesError;
  }

  pipelineLog("edition_saved", "Stories saved", { count: storyRecords.length, editionId });

  const conceptInsert: Database["public"]["Tables"]["concepts"]["Insert"] = {
    title: params.concept.title,
    definition: params.concept.definition,
    simple_example: params.concept.simpleExample,
    why_professionals_care: params.concept.whyProfessionalsCare,
    why_you_saw_it_today: params.concept.whyYouSawItToday
  };

  const { error: conceptError } = await supabase.from("concepts").insert(conceptInsert);
  if (conceptError) {
    pipelineLog("edition_saved", "Failed to save concept", { error: conceptError.message });
    throw conceptError;
  }

  const { data: quizData, error: quizError } = await supabase
    .from("quizzes")
    .insert({ edition_id: editionId, title: "Daily Edition Quiz" })
    .select("id")
    .single();

  if (quizError || !quizData) {
    pipelineLog("quiz_saved", "Failed to create quiz", { error: quizError?.message });
    throw quizError ?? new Error("Failed to create quiz");
  }

  const quizId = quizData.id as string;

  const quizQuestionRecords = params.quiz.questions.map((question) => ({
    quiz_id: quizId,
    question: question.question,
    option_a: question.options[0],
    option_b: question.options[1],
    option_c: question.options[2],
    option_d: question.options[3],
    correct_answer: question.correctAnswer,
    explanation: question.explanation
  }));

  const { error: quizQuestionsError } = await supabase.from("quiz_questions").insert(quizQuestionRecords);
  if (quizQuestionsError) {
    pipelineLog("quiz_saved", "Failed to save quiz questions", { error: quizQuestionsError.message });
    throw quizQuestionsError;
  }

  pipelineLog("quiz_saved", "Quiz saved", { quizId, questionCount: quizQuestionRecords.length, editionId });

  const flashcardRecords = params.flashcards.map((card) => ({
    edition_id: editionId,
    front: card.front,
    back: card.back,
    category: card.category
  }));

  const { error: flashcardsError } = await supabase.from("flashcards").insert(flashcardRecords);
  if (flashcardsError) {
    pipelineLog("flashcards_saved", "Failed to save flashcards", { error: flashcardsError.message });
    throw flashcardsError;
  }

  pipelineLog("flashcards_saved", "Flashcards saved", { count: flashcardRecords.length, editionId });

  const glossaryRecords = params.glossary.map((entry) => ({
    edition_id: editionId,
    term: entry.term,
    definition: entry.definition,
    simple_explanation: entry.simpleExplanation
  }));

  const { error: glossaryError } = await supabase.from("glossary").insert(glossaryRecords);
  if (glossaryError) {
    pipelineLog("glossary_saved", "Failed to save glossary", { error: glossaryError.message });
    throw glossaryError;
  }

  pipelineLog("glossary_saved", "Glossary saved", { count: glossaryRecords.length, editionId });

  return {
    editionId,
    edition: params.edition,
    concept: params.concept,
    quiz: params.quiz,
    flashcards: params.flashcards,
    glossary: params.glossary
  };
}
