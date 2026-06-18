import { createSupabaseServerClient } from "@/lib/supabase/server";
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
  const supabase = await createSupabaseServerClient();

  const editionInsert: Database["public"]["Tables"]["editions"]["Insert"] = {
    edition_date: new Date().toISOString().split("T")[0],
    market_mood: params.edition.marketMood,
    reading_time: params.edition.readingTime
  };

  const { data: editionData, error: editionError } = await supabase.from("editions").insert(editionInsert).select("id").single();
  if (editionError || !editionData) {
    throw editionError ?? new Error("Failed to create edition");
  }

  const editionId = editionData.id as string;

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
    throw storiesError;
  }

  const conceptInsert: Database["public"]["Tables"]["concepts"]["Insert"] = {
    title: params.concept.title,
    definition: params.concept.definition,
    simple_example: params.concept.simpleExample,
    why_professionals_care: params.concept.whyProfessionalsCare,
    why_you_saw_it_today: params.concept.whyYouSawItToday
  };

  const { error: conceptError } = await supabase.from("concepts").insert(conceptInsert);
  if (conceptError) {
    throw conceptError;
  }

  const { data: quizData, error: quizError } = await supabase
    .from("quizzes")
    .insert({ edition_id: editionId, title: "Daily Edition Quiz" })
    .select("id")
    .single();

  if (quizError || !quizData) {
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
    throw quizQuestionsError;
  }

  const flashcardRecords = params.flashcards.map((card) => ({
    edition_id: editionId,
    front: card.front,
    back: card.back,
    category: card.category
  }));

  const { error: flashcardsError } = await supabase.from("flashcards").insert(flashcardRecords);
  if (flashcardsError) {
    throw flashcardsError;
  }

  const glossaryRecords = params.glossary.map((entry) => ({
    edition_id: editionId,
    term: entry.term,
    definition: entry.definition,
    simple_explanation: entry.simpleExplanation
  }));

  const { error: glossaryError } = await supabase.from("glossary").insert(glossaryRecords);
  if (glossaryError) {
    throw glossaryError;
  }

  return {
    editionId,
    edition: params.edition,
    concept: params.concept,
    quiz: params.quiz,
    flashcards: params.flashcards,
    glossary: params.glossary
  };
}
