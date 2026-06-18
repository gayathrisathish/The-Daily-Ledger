create extension if not exists pgcrypto;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.editions (
  id uuid primary key default gen_random_uuid(),
  edition_date date not null unique,
  slug text not null unique,
  title text not null,
  summary text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  headline text not null,
  source text not null,
  url text not null,
  summary text not null,
  section text not null,
  rank integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.market_snapshots (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid not null references public.editions (id) on delete cascade,
  symbol text not null,
  label text not null,
  value text not null,
  change_text text not null,
  direction text not null check (direction in ('up', 'down', 'flat')),
  explanation text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.concepts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  definition text not null,
  example text not null,
  why_professionals_care text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  revenue_model text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.career_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  body text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  edition_id uuid references public.editions (id) on delete set null,
  title text not null,
  quiz_type text not null check (quiz_type in ('daily', 'weekly', 'archive')),
  created_at timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes (id) on delete cascade,
  prompt text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null,
  explanation text not null,
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  concept_id uuid references public.concepts (id) on delete set null,
  front text not null,
  back text not null,
  deck_name text not null default 'today',
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  completion_status text not null default 'not_started' check (completion_status in ('not_started', 'in_progress', 'complete')),
  score integer,
  updated_at timestamptz not null default now(),
  unique (user_id, entity_type, entity_id)
);

create index if not exists stories_edition_id_idx on public.stories (edition_id);
create index if not exists market_snapshots_edition_id_idx on public.market_snapshots (edition_id);
create index if not exists quiz_questions_quiz_id_idx on public.quiz_questions (quiz_id);
create index if not exists user_progress_user_id_idx on public.user_progress (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

create trigger set_editions_updated_at
before update on public.editions
for each row execute function public.set_updated_at();

create trigger set_stories_updated_at
before update on public.stories
for each row execute function public.set_updated_at();

create trigger set_concepts_updated_at
before update on public.concepts
for each row execute function public.set_updated_at();

create trigger set_companies_updated_at
before update on public.companies
for each row execute function public.set_updated_at();

create trigger set_career_articles_updated_at
before update on public.career_articles
for each row execute function public.set_updated_at();
