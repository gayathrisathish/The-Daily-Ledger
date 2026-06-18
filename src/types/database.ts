export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
};

export interface EditionRecord {
  id: string;
  edition_date: string;
  market_mood: string;
  reading_time: string;
  created_at: string;
  updated_at: string;
}

export interface StoryRecord {
  id: string;
  edition_id: string;
  headline: string;
  what_happened: string;
  why_it_matters: string;
  beginner_translation: string;
  story_order: number;
  created_at: string;
  updated_at: string;
}

export interface MarketSnapshotRecord {
  id: string;
  edition_id: string;
  asset_name: string;
  asset_value: string;
  daily_change: string;
  explanation: string;
  created_at: string;
  updated_at: string;
}

export interface ConceptRecord {
  id: string;
  title: string;
  definition: string;
  simple_example: string;
  why_professionals_care: string;
  why_you_saw_it_today: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyRecord {
  id: string;
  name: string;
  description: string;
  why_investors_care: string;
  created_at: string;
  updated_at: string;
}

export interface QuizRecord {
  id: string;
  edition_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestionRecord {
  id: string;
  quiz_id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
  created_at: string;
  updated_at: string;
}

export interface FlashcardRecord {
  id: string;
  edition_id: string;
  front: string;
  back: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface GlossaryRecord {
  id: string;
  edition_id: string;
  term: string;
  definition: string;
  simple_explanation: string;
  created_at: string;
  updated_at: string;
}

export interface NewsCacheRecord {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: string;
  published_at: string;
  score: number;
  created_at: string;
}

export interface ReadingStreakRecord {
  id: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      editions: Table<EditionRecord>;
      stories: Table<StoryRecord>;
      market_snapshots: Table<MarketSnapshotRecord>;
      concepts: Table<ConceptRecord>;
      companies: Table<CompanyRecord>;
      quizzes: Table<QuizRecord>;
      quiz_questions: Table<QuizQuestionRecord>;
      flashcards: Table<FlashcardRecord>;
      glossary: Table<GlossaryRecord>;
      news_cache: Table<NewsCacheRecord>;
      reading_streaks: Table<ReadingStreakRecord>;
    };
  };
}
