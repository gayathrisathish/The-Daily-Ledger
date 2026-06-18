export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
};

export interface UserRecord {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface EditionRecord {
  id: string;
  edition_date: string;
  slug: string;
  title: string;
  summary: string | null;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface StoryRecord {
  id: string;
  edition_id: string;
  headline: string;
  source: string;
  url: string;
  summary: string;
  section: string;
  rank: number;
  created_at: string;
  updated_at: string;
}

export interface MarketSnapshotRecord {
  id: string;
  edition_id: string;
  symbol: string;
  label: string;
  value: string;
  change_text: string;
  direction: "up" | "down" | "flat";
  explanation: string;
  created_at: string;
}

export interface ConceptRecord {
  id: string;
  slug: string;
  title: string;
  definition: string;
  example: string;
  why_professionals_care: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyRecord {
  id: string;
  slug: string;
  name: string;
  description: string;
  revenue_model: string;
  created_at: string;
  updated_at: string;
}

export interface CareerArticleRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface QuizRecord {
  id: string;
  edition_id: string | null;
  title: string;
  quiz_type: "daily" | "weekly" | "archive";
  created_at: string;
}

export interface QuizQuestionRecord {
  id: string;
  quiz_id: string;
  prompt: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  position: number;
  created_at: string;
}

export interface FlashcardRecord {
  id: string;
  concept_id: string | null;
  front: string;
  back: string;
  deck_name: string;
  created_at: string;
}

export interface UserProgressRecord {
  id: string;
  user_id: string;
  entity_type: string;
  entity_id: string;
  completion_status: "not_started" | "in_progress" | "complete";
  score: number | null;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: Table<UserRecord>;
      editions: Table<EditionRecord>;
      stories: Table<StoryRecord>;
      market_snapshots: Table<MarketSnapshotRecord>;
      concepts: Table<ConceptRecord>;
      companies: Table<CompanyRecord>;
      career_articles: Table<CareerArticleRecord>;
      quizzes: Table<QuizRecord>;
      quiz_questions: Table<QuizQuestionRecord>;
      flashcards: Table<FlashcardRecord>;
      user_progress: Table<UserProgressRecord>;
    };
  };
}
