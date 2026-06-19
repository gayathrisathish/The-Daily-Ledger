import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { getPipelineDiagnostics } from "@/lib/pipeline/diagnostics";
import { isUsingServiceRole } from "@/lib/supabase/admin";

export default async function PipelineDiagnosticsPage() {
  const diagnostics = await getPipelineDiagnostics();

  const stats = [
    {
      label: "Raw Stories",
      value: diagnostics.rawStoriesCount ?? "—",
      note: diagnostics.rawStoriesNote
    },
    {
      label: "Ranked Stories",
      value: diagnostics.rankedStoriesCount,
      note: "Rows in news_cache (top ranked stories persisted for AI generation)"
    },
    {
      label: "Editions",
      value: diagnostics.editionsCount,
      note: "Rows in editions"
    },
    {
      label: "Quizzes",
      value: diagnostics.quizzesCount,
      note: "Rows in quizzes"
    },
    {
      label: "Flashcards",
      value: diagnostics.flashcardsCount,
      note: "Rows in flashcards"
    },
    {
      label: "Glossary",
      value: diagnostics.glossaryCount,
      note: "Rows in glossary"
    }
  ];

  return (
    <PageShell title="Pipeline Diagnostics" description="Live Supabase counts for the content pipeline.">
      <PageHeader
        title="Content Pipeline Status"
        description="Counts reflect actual rows in Supabase. Use /ai-test → Generate Edition to run the full pipeline."
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-background/80 p-5">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">{stat.note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-border bg-background/80 p-5 text-sm text-muted-foreground">
        <p>
          Supabase client: {isUsingServiceRole() ? "service role key (bypasses RLS)" : "anon key (ensure RLS allows pipeline writes)"}
        </p>
        <p className="mt-2">
          Pipeline flow: GNews → curateStories → news_cache → AI generation → editions / stories / quizzes / flashcards / glossary
        </p>
      </section>
    </PageShell>
  );
}
