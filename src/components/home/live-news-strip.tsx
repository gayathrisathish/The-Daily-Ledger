"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface LiveNewsItem {
  time: string;
  headline: string;
}

interface LiveNewsStripProps {
  items: LiveNewsItem[];
  className?: string;
}

export function LiveNewsStrip({ items, className }: LiveNewsStripProps) {
  return (
    <section className={cn("w-full", className)} aria-label="Live news strip">
      <div className="mb-4 flex items-end justify-between gap-4 px-1">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Live News</p>
          <p className="mt-1 text-sm text-muted-foreground">A quick read on the stories moving markets right now.</p>
        </div>
      </div>
      <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max gap-3">
          {items.map((item, index) => (
            <motion.article
              key={`${item.time}-${item.headline}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="min-w-[18rem] sm:min-w-[20rem]"
            >
              <Card className="h-full border-border/70 bg-card/95 px-4 py-4 shadow-soft transition-shadow duration-200 hover:shadow-glow">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">{item.time}</p>
                  <p className="text-base font-medium leading-6 tracking-tight text-card-foreground">{item.headline}</p>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}