"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface StudyFlashcardProps {
  front: string;
  back: string;
}

interface FlashcardProps {
  cards: StudyFlashcardProps[];
}

export function Flashcard({ cards }: FlashcardProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const activeCard = useMemo(() => cards[index], [cards, index]);

  const nextCard = () => {
    setFlipped(false);
    setIndex((current) => (current + 1) % cards.length);
  };

  const previousCard = () => {
    setFlipped(false);
    setIndex((current) => (current - 1 + cards.length) % cards.length);
  };

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
      <CardHeader className="border-b border-border/60 pb-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Study Mode</p>
            <CardTitle className="text-2xl">Card {index + 1} of {cards.length}</CardTitle>
          </div>
          <Button type="button" variant="outline" onClick={() => setFlipped((value) => !value)}>
            {flipped ? "Show Question" : "Show Answer"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <div className="relative min-h-[14rem] overflow-hidden rounded-[1.5rem] border border-border/70 bg-background/80 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={flipped ? "back" : "front"}
              initial={{ opacity: 0, rotateY: flipped ? -90 : 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: flipped ? 90 : -90 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center p-6 text-center"
            >
              <div className="space-y-4">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">{flipped ? "Answer" : "Question"}</p>
                <p className="text-2xl font-semibold tracking-tight text-balance">{flipped ? activeCard.back : activeCard.front}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="outline" onClick={previousCard}>Previous Card</Button>
          <Button type="button" onClick={nextCard}>Next Card</Button>
        </div>
      </CardContent>
    </Card>
  );
}
