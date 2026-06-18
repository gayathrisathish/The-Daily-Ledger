create extension if not exists pgcrypto;

create table if not exists public.editions (
  id uuid primary key default gen_random_uuid(),
  edition_date date not null unique,
  market_mood text not null,
  reading_time text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  headline text not null,
  what_happened text not null,
  why_it_matters text not null,
  beginner_translation text not null,
  story_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.market_snapshots (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  asset_name text not null,
  asset_value text not null,
  daily_change text not null,
  explanation text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.concepts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  definition text not null,
  simple_example text not null,
  why_professionals_care text not null,
  why_you_saw_it_today text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  why_investors_care text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  title text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null,
  explanation text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  front text not null,
  back text not null,
  category text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.glossary (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  term text not null,
  definition text not null,
  simple_explanation text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reading_streaks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.news_cache (
  id text primary key,
  title text not null,
  summary text not null,
  url text not null,
  source text not null,
  category text not null,
  published_at timestamptz not null,
  score numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists stories_edition_id_idx on public.stories (edition_id);
create index if not exists market_snapshots_edition_id_idx on public.market_snapshots (edition_id);
create index if not exists quizzes_edition_id_idx on public.quizzes (edition_id);
create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);
create index if not exists flashcards_edition_id_idx on public.flashcards (edition_id);
create index if not exists reading_streaks_user_id_idx on public.reading_streaks (user_id);
create index if not exists news_cache_score_idx on public.news_cache (score desc);
create index if not exists news_cache_published_at_idx on public.news_cache (published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_editions_updated_at
before update on public.editions
for each row execute function public.set_updated_at();

create trigger set_stories_updated_at
before update on public.stories
for each row execute function public.set_updated_at();

create trigger set_market_snapshots_updated_at
before update on public.market_snapshots
for each row execute function public.set_updated_at();

create trigger set_concepts_updated_at
before update on public.concepts
for each row execute function public.set_updated_at();

create trigger set_companies_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger set_quizzes_updated_at
before update on public.quizzes
for each row execute function public.set_updated_at();

create trigger set_quiz_questions_updated_at
before update on public.quiz_questions
for each row execute function public.set_updated_at();

create trigger set_flashcards_updated_at
before update on public.flashcards
for each row execute function public.set_updated_at();
