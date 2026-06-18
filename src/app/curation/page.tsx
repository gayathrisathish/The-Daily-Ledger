import { PageHeader } from "@/components/shared/page-header";
import { CurationStats } from "@/components/curation/curation-stats";
import { NewsSourceCard } from "@/components/curation/news-source-card";
import { NewsStoryCard } from "@/components/curation/news-story-card";
import { RankedStoryCard } from "@/components/curation/ranked-story-card";
import type { RankedNewsItem, NewsSourceStatus } from "@/lib/news/types";
import { curateStories } from "@/lib/news/curator";

async function getCurationData() {
  const result = await curateStories();
  return result;
}

export default async function CurationPage() {
  const { sourceStatuses, rawStories, deduplicatedStories, rankedStories, topStories } = await getCurationData();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader title="Curation Dashboard" description="Review the news ingestion pipeline, inspect raw stories, and validate ranked story selection before editions are created." />

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">News Sources</h2>
          <div className="grid gap-4">
            {sourceStatuses.map((status) => (
              <NewsSourceCard key={status.source.id} status={status} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Top Stories</h2>
          <div className="grid gap-4">
            {topStories.slice(0, 5).map((story) => (
              <RankedStoryCard key={story.id} story={story} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_2fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Curation Overview</h2>
          <CurationStats
            totalSources={sourceStatuses.length}
            fetchedStories={rawStories.length}
            deduplicatedStories={deduplicatedStories.length}
            rankedStories={rankedStories.length}
            topStories={topStories.length}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ranked Stories</h2>
          <div className="grid gap-4">
            {rankedStories.slice(0, 10).map((story) => (
              <RankedStoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Raw Stories</h2>
          <div className="grid gap-4">
            {rawStories.slice(0, 10).map((story) => (
              <NewsStoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Deduplicated Stories</h2>
          <div className="grid gap-4">
            {deduplicatedStories.slice(0, 10).map((story) => (
              <NewsStoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
