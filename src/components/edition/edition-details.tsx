import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, CircleAlert } from "lucide-react";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { NewsStoryCard } from "@/components/edition/news-story-card";
import { MarketDashboard } from "@/components/edition/market-dashboard";
import { BigStory } from "@/components/edition/big-story";
import { FinanceSchoolCard } from "@/components/edition/finance-school-card";
import { CompanyWatch } from "@/components/edition/company-watch";
import { WhatToWatch } from "@/components/edition/what-to-watch";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CompanyRecord, ConceptRecord, EditionRecord, MarketSnapshotRecord, StoryRecord } from "@/types/database";

interface EditionDetailsProps {
  edition: EditionRecord;
  stories: StoryRecord[];
  marketSnapshots: MarketSnapshotRecord[];
  concept: ConceptRecord | null;
  companies: CompanyRecord[];
}

const bigStorySections = [
  {
    label: "What Happened",
    body: "Markets are leaning on the same two forces: a careful central-bank message and still-resilient corporate earnings. That combination has kept investors interested in quality names while still respecting rate risk."
  },
  {
    label: "Background",
    body: "Inflation has cooled enough to invite optimism, but not enough to guarantee a smooth path to lower rates. That makes each policy comment and macro print more important than usual."
  },
  {
    label: "Why Markets Care",
    body: "Higher-for-longer rates affect how investors discount future cash flows, especially for expensive growth stocks and sectors that depend on easy funding."
  },
  {
    label: "Who Benefits",
    body: "Cash-generative businesses, lenders with disciplined credit books, and firms with pricing power tend to look better when the market becomes choosy."
  },
  {
    label: "Who Gets Hurt",
    body: "Companies that rely heavily on borrowing, speculative growth narratives, or weak margins can struggle if rate cuts remain delayed."
  },
  {
    label: "What To Watch Next",
    body: "Watch the next inflation release, the central bank’s wording, and whether bond yields keep rising or start to settle."
  }
];

const watchItems = [
  { title: "RBI Policy Decision", description: "A policy statement could shift local rate expectations and bank sentiment." },
  { title: "US Inflation Data", description: "A fresh CPI print may move bond yields and rate-cut expectations." },
  { title: "Major Earnings Release", description: "Large-cap results can steer sentiment across index-heavy sectors." }
];

export function EditionDetails({ edition, stories, marketSnapshots, concept, companies }: EditionDetailsProps) {
  const formattedDate = new Date(edition.edition_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <PageShell title="Today's Edition" description="A 10–15 minute editorial read that turns market news into understanding.">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <PageHeader title={formattedDate} description={`Reading time: ${edition.reading_time} · Market Mood: ${edition.market_mood}`} />

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Date", value: formattedDate },
            { icon: Clock3, label: "Reading Time", value: edition.reading_time },
            { icon: CircleAlert, label: "Market Mood", value: edition.market_mood }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="rounded-[1.25rem] border border-border/70 bg-card/95 p-5 shadow-soft">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                  <Icon className="h-4 w-4 text-primary" />
                  {item.label}
                </div>
                <p className="mt-3 text-lg font-semibold tracking-tight">{item.value}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">5 Things That Matter Today</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {stories.map((story) => (
            <NewsStoryCard key={story.id} headline={story.headline} whatHappened={story.what_happened} whyItMatters={story.why_it_matters} beginnerTranslation={story.beginner_translation} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Market Dashboard</h2>
        <MarketDashboard
          items={marketSnapshots.map((snapshot) => ({
            asset: snapshot.asset_name,
            value: snapshot.asset_value,
            dailyChange: snapshot.daily_change,
            direction: snapshot.daily_change.startsWith("+") ? "up" : snapshot.daily_change.startsWith("-") ? "down" : "flat",
            explanation: snapshot.explanation
          }))}
        />
      </section>

      <section className="space-y-5">
        <BigStory headline="Why rates, earnings, and inflation are still the market’s main story" sections={bigStorySections} />
      </section>

      <section className="space-y-5">
        {concept ? <FinanceSchoolCard concept={concept.title} definition={concept.definition} simpleExample={concept.simple_example} whyProfessionalsCare={concept.why_professionals_care} whyYouSawItToday={concept.why_you_saw_it_today} /> : null}
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Company Watch</h2>
        <CompanyWatch
          items={companies.map((company) => ({
            company: company.name,
            whatHappened: company.description,
            whyInvestorsCare: company.why_investors_care
          }))}
        />
      </section>

      <section className="space-y-5">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">What To Watch</h2>
        <WhatToWatch items={watchItems} />
      </section>

      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/95 p-8 shadow-soft">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Knowledge Check</p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ready to test what you learned?</h2>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground">Take today’s quiz to check your understanding of the edition and reinforce the main ideas.</p>
          </div>
          <Link href="/quiz" className={cn(buttonVariants({ variant: "default", size: "default" }), "w-fit px-6") }>
            Take Today's Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
