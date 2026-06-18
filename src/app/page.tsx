import { Banknote, Brain, Building2, CircleDollarSign, GraduationCap, Landmark, Newspaper, ReceiptText } from "lucide-react";

import { FeatureGrid } from "@/components/home/feature-grid";
import { HeroSection } from "@/components/home/hero-section";
import { LiveNewsStrip } from "@/components/home/live-news-strip";
import { MarketMoodCard } from "@/components/home/market-mood-card";
import { TopicGrid } from "@/components/home/topic-grid";
import { TodaysFocus } from "@/components/home/todays-focus";
import { SectionHeader } from "@/components/ui/section-header";

const liveNews = [
  { time: "12:18", headline: "Fed Signals Rates May Stay Higher" },
  { time: "12:14", headline: "Oil Prices Rise On Supply Concerns" },
  { time: "12:09", headline: "Nvidia Earnings Beat Expectations" },
  { time: "11:54", headline: "RBI Comments On Inflation" },
  { time: "11:47", headline: "Bond Yields Hold Near Key Levels" },
  { time: "11:39", headline: "IPO Activity Starts To Warm Up" }
];

const featureCards = [
  {
    title: "Today's Edition",
    description: "The most important financial stories explained in plain English.",
    href: "/edition",
    icon: Newspaper
  },
  {
    title: "Finance School",
    description: "Learn one finance concept every day.",
    href: "/finance-school",
    icon: GraduationCap
  },
  {
    title: "Quiz Center",
    description: "Test what you learned and improve retention.",
    href: "/quiz",
    icon: Brain
  }
];

const recentTopics = [
  {
    title: "Inflation",
    description: "Why prices move slowly, how central banks respond, and why investors keep watching the print.",
    href: "/finance-school"
  },
  {
    title: "Bond Yield",
    description: "A simple guide to the rate that quietly shapes valuations and sentiment.",
    href: "/finance-school"
  },
  {
    title: "Market Capitalization",
    description: "How company size influences index weight, investor attention, and risk appetite.",
    href: "/finance-school"
  },
  {
    title: "EBITDA",
    description: "Why this profit measure matters and where it can mislead.",
    href: "/finance-school"
  },
  {
    title: "Repo Rate",
    description: "The policy rate that affects borrowing costs across the economy.",
    href: "/finance-school"
  },
  {
    title: "Cash Flow",
    description: "The clearest read on whether a business is funding itself well.",
    href: "/finance-school"
  },
  {
    title: "P/E Ratio",
    description: "How investors compare price and earnings when judging valuation.",
    href: "/finance-school"
  },
  {
    title: "IPO",
    description: "What happens when a private company goes public and why timing matters.",
    href: "/finance-school"
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <LiveNewsStrip items={liveNews} />

      <HeroSection
        title={"Understanding Markets,\nOne Story At A Time."}
        subtitle="The Daily Ledger transforms financial news into understanding through explanations, quizzes, flashcards, and active recall."
        primaryCta={{ label: "Read Today's Edition", href: "/edition" }}
        secondaryCta={{ label: "Start Learning", href: "/finance-school" }}
      />

      <section className="space-y-6">
        <SectionHeader title="Featured Learning Modules" subtitle="Three ways to move from headlines to lasting understanding." />
        <FeatureGrid items={featureCards} />
      </section>

      <MarketMoodCard mood="Market Mood" status="Neutral" readingStreak="17 Days" conceptsLearned="112" quizAccuracy="83%" />

      <section className="space-y-6">
        <SectionHeader title="Recent Topics" subtitle="A compact view of the ideas shaping how readers understand markets and business." />
        <TopicGrid items={recentTopics} />
      </section>

      <section className="space-y-6">
        <SectionHeader title="Today's Focus" subtitle="A deeper editorial read built to connect macro forces, policy, and price action." />
        <TodaysFocus
          title="Why Interest Rates Move Markets"
          description="Learn how inflation, central banks, and bond yields influence stocks and the wider economy."
          href="/edition"
          ctaLabel="Explore Topic"
        />
      </section>
    </main>
  );
}