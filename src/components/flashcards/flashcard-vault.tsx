import { Flashcard } from "@/components/cards/flashcard";

const cards = [
  { front: "What is inflation?", back: "Placeholder back text for the definition." },
  { front: "What is EBITDA?", back: "Placeholder back text for the accounting concept." }
] as const;

export function FlashcardVault(): React.JSX.Element {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      {cards.map((card) => (
        <Flashcard key={card.front} {...card} />
      ))}
    </section>
  );
}