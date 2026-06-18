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

create index if not exists news_cache_score_idx on public.news_cache (score desc);
create index if not exists news_cache_published_at_idx on public.news_cache (published_at desc);
