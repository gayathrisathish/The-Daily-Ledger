-- Allow the anon key to read/write pipeline tables when service role is unavailable.
-- Run this in the Supabase SQL editor if pipeline writes fail with permission errors.

alter table public.news_cache enable row level security;
alter table public.editions enable row level security;
alter table public.stories enable row level security;
alter table public.concepts enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.flashcards enable row level security;
alter table public.glossary enable row level security;

create policy "Allow public read on news_cache" on public.news_cache for select using (true);
create policy "Allow public write on news_cache" on public.news_cache for all using (true) with check (true);

create policy "Allow public read on editions" on public.editions for select using (true);
create policy "Allow public write on editions" on public.editions for all using (true) with check (true);

create policy "Allow public read on stories" on public.stories for select using (true);
create policy "Allow public write on stories" on public.stories for all using (true) with check (true);

create policy "Allow public read on concepts" on public.concepts for select using (true);
create policy "Allow public write on concepts" on public.concepts for all using (true) with check (true);

create policy "Allow public read on quizzes" on public.quizzes for select using (true);
create policy "Allow public write on quizzes" on public.quizzes for all using (true) with check (true);

create policy "Allow public read on quiz_questions" on public.quiz_questions for select using (true);
create policy "Allow public write on quiz_questions" on public.quiz_questions for all using (true) with check (true);

create policy "Allow public read on flashcards" on public.flashcards for select using (true);
create policy "Allow public write on flashcards" on public.flashcards for all using (true) with check (true);

create policy "Allow public read on glossary" on public.glossary for select using (true);
create policy "Allow public write on glossary" on public.glossary for all using (true) with check (true);
