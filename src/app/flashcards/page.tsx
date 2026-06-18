import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { Badge } from "@/components/ui/badge";
import { FlashcardVault } from "@/components/flashcards/flashcard-vault";
import { EmptyState } from "@/components/shared/empty-state";
import { get } from "@/lib/data/flashcards";

const collections = ["Markets", "Economics", "Accounting", "Valuation", "Investing"] as const;

export default async function FlashcardsPage() {
  const cards = await get();

  return (
    <PageShell title="Flashcard Vault" description="Long-term retention through short, repeatable review sessions.">
      <PageHeader title="Today's Cards" description={`${cards.length} cards available · ${Math.max(0, cards.length - 3)} mastered · ${Math.min(3, cards.length)} review due`} />

      <section>
        {cards.length > 0 ? (
          <FlashcardVault cards={cards.map((card) => ({ front: card.front, back: card.back }))} />
        ) : (
          <EmptyState title="No flashcards available" description="New cards will appear after the next edition is published." />
        )}
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Collections</h2>
        <div className="flex flex-wrap gap-3">
          {collections.map((collection) => (
            <Badge key={collection} variant="secondary" className="px-4 py-1.5 text-sm">
              {collection}
            </Badge>
          ))}
        </div>
      </section>

      <EmptyState title="Study history coming soon" description="This view will later hold spaced-repetition progress, saved decks, and review scheduling." />
    </PageShell>
  );
}
