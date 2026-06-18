import { PageShell } from "@/components/layout/page-shell";
import { FlashcardPreview } from "@/components/flashcards/flashcard-preview";

const cards = [
  {
    front: "What does EBITDA measure?",
    back: "Operating performance before financing, taxes, and non-cash depreciation or amortization items.",
    deckName: "Today\'s Cards"
  },
  {
    front: "Why do bond yields matter?",
    back: "They influence valuation, borrowing costs, and the relative appeal of stocks versus fixed income.",
    deckName: "Review Cards"
  },
  {
    front: "What is market cap?",
    back: "Share price multiplied by total outstanding shares, used to estimate company size.",
    deckName: "Collections"
  }
];

export default function FlashcardsPage() {
  return (
    <PageShell title="Flashcard Vault" description="A compact review layer that turns today\'s reading into long-term memory.">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <FlashcardPreview key={card.front} {...card} />
        ))}
      </section>
    </PageShell>
  );
}