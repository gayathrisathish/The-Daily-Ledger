"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MarketMoodCardProps {
  mood: string;
  status: string;
  readingStreak: string;
  conceptsLearned: string;
  quizAccuracy: string;
}

export function MarketMoodCard({ mood, status, readingStreak, conceptsLearned, quizAccuracy }: MarketMoodCardProps) {
  const stats = [
    { label: "Reading Streak", value: readingStreak },
    { label: "Concepts Learned", value: conceptsLearned },
    { label: "Quiz Accuracy", value: quizAccuracy }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
        <CardHeader className="gap-5 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Market Mood</p>
            <CardTitle className="text-3xl md:text-4xl">{mood}</CardTitle>
          </div>
          <div className="rounded-full border border-border/70 bg-secondary px-4 py-2 text-sm font-medium text-foreground">{status}</div>
        </CardHeader>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/70 bg-background/70 p-5">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-card-foreground">{stat.value}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </motion.section>
  );
}
