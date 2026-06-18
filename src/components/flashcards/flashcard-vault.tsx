import { Flashcard, type StudyFlashcardProps } from "@/components/flashcards/flashcard";

interface FlashcardVaultProps {
  cards: StudyFlashcardProps[];
}

export function FlashcardVault({ cards }: FlashcardVaultProps): React.JSX.Element {
  return <Flashcard cards={cards} />;
}
