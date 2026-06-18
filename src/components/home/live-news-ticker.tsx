"use client";

import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

interface LiveNewsItem {
  time: string;
  headline: string;
}

interface LiveNewsTickerProps {
  items: LiveNewsItem[];
}

export function LiveNewsTicker({ items }: LiveNewsTickerProps) {
  return (
    <Card className="overflow-hidden border-border/80 bg-card/90">
      <CardContent className="space-y-4 px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_6px_rgba(45,212,191,0.16)]" />
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Live News Feed</p>
        </div>
        <motion.div
          className="flex gap-3 overflow-x-auto pb-1"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {items.map((item) => (
            <article key={`${item.time}-${item.headline}`} className="min-w-[15rem] rounded-2xl border border-border/70 bg-background/70 px-4 py-4 shadow-soft sm:min-w-[16rem]">
              <p className="text-sm font-medium text-primary">{item.time}</p>
              <p className="mt-2 text-base font-medium leading-6 text-foreground">{item.headline}</p>
            </article>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}