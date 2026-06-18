import { PageShell } from "@/components/layout/page-shell";
import { EditionSection } from "@/components/edition/edition-section";
import { StatCard } from "@/components/cards/stat-card";
import type { MarketStat } from "@/types/content";

const fiveThings = [
  {
    title: "Central bank commentary",
    body: "What happened: policymakers signaled patience. Why it matters: rate expectations move quickly from here. Beginner translation: cheaper money may take longer to arrive."
  },
  {
    title: "Earnings revisions",
    body: "What happened: analysts adjusted forecasts for select companies. Why it matters: valuations respond to new profit assumptions. Beginner translation: stock prices follow expectations, not just headlines."
  },
  {
    title: "Commodity volatility",
    body: "What happened: oil and gold moved on macro uncertainty. Why it matters: input costs and safe-haven demand affect many sectors. Beginner translation: raw materials can reshape company margins."
  },
  {
    title: "Banking signals",
    body: "What happened: lenders stayed in focus after mixed credit data. Why it matters: banks often reflect the broader economy first. Beginner translation: the financial system can hint at growth trends."
  },
  {
    title: "Tech sentiment",
    body: "What happened: investors kept an eye on large-cap technology names. Why it matters: a few leaders can steer index performance. Beginner translation: big companies can move the whole market."
  }
];

const marketStats: MarketStat[] = [
  { symbol: "Sensex", value: "73,981", change: "+0.5%", direction: "up", explanation: "Large-cap strength is supporting the index after a steady start to the session." },
  { symbol: "Nasdaq", value: "17,892", change: "+0.9%", direction: "up", explanation: "Growth stocks are holding up as traders focus on earnings momentum." },
  { symbol: "USD/INR", value: "83.44", change: "+0.1%", direction: "flat", explanation: "The rupee is moving in a tight band while traders wait for fresh macro data." }
];

const bigStory = [
  {
    title: "What happened",
    body: "A major policy and earnings narrative is shaping the day\'s market tone, with investors balancing growth expectations against rate uncertainty."
  },
  {
    title: "Background",
    body: "Markets are pricing a slower glide path for easing, while company guidance remains the key driver for individual names."
  },
  {
    title: "Why markets care",
    body: "The mix of rates, inflation, and margins changes how investors discount future cash flows and how they compare sectors."
  },
  {
    title: "Chain reaction",
    body: "Bond yields, bank stocks, and rate-sensitive sectors tend to react first, followed by broader index leadership if the story persists."
  },
  {
    title: "Winners",
    body: "Cash-rich companies, defensive sectors, and businesses with resilient pricing power often hold up better in cautious tape."
  },
  {
    title: "Losers",
    body: "Highly leveraged firms and expensive growth names can struggle when discount rates stay elevated."
  },
  {
    title: "What to watch",
    body: "Keep an eye on policy commentary, earnings updates, and the next batch of inflation prints for confirmation."
  }
];

const watchList = [
  { title: "Policy speech", body: "A central bank official is due to speak later today." },
  { title: "Large-cap earnings", body: "Several index heavyweights report results this week." },
  { title: "Macro data", body: "The next inflation release could shift rate expectations." }
];

export default function EditionPage() {
  return (
    <PageShell title="Today\'s Edition" description="A single daily reading experience with the most important stories, market moves, and a concept to remember.">
      <EditionSection
        title="5 Things That Matter Today"
        description="Each story should answer what happened, why it matters, and the beginner translation."
        items={fiveThings.map((item) => ({ title: item.title, body: item.body }))}
      />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Market Dashboard</h2>
        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
          {marketStats.map((stat) => (
            <StatCard key={stat.symbol} stat={stat} />
          ))}
        </div>
      </section>

      <EditionSection
        title="Today\'s Big Story"
        description="A deeper read with context, market implications, and the likely ripple effects."
        items={bigStory}
      />

      <EditionSection
        title="Company & Sector Watch"
        description="Track the companies and sectors likely to move the conversation today."
        items={[
          {
            title: "Company spotlight",
            body: "A top-line revenue update or guidance change should be summarized here in plain language."
          },
          {
            title: "Sector of the day",
            body: "Highlight the sector with the clearest market relevance and explain why it is in play."
          }
        ]}
      />

      <EditionSection
        title="Finance School"
        description="One finance concept tied directly to today\'s headlines."
        items={[
          {
            title: "Concept of the day",
            body: "Definition: a plain-English explanation. Example: a simple real-world case. Why professionals care: the market lens that makes it useful."
          }
        ]}
      />

      <EditionSection
        title="What To Watch"
        description="Three upcoming events that could matter next."
        items={watchList}
      />
    </PageShell>
  );
}