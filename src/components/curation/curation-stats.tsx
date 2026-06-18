import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CurationStatsProps {
  totalSources: number;
  fetchedStories: number;
  deduplicatedStories: number;
  rankedStories: number;
  topStories: number;
}

export function CurationStats({ totalSources, fetchedStories, deduplicatedStories, rankedStories, topStories }: CurationStatsProps) {
  const stats = [
    { label: "Sources", value: totalSources },
    { label: "Raw Stories", value: fetchedStories },
    { label: "Deduplicated", value: deduplicatedStories },
    { label: "Ranked", value: rankedStories },
    { label: "Top Stories", value: topStories }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl bg-background/70 p-4 text-sm shadow-sm">
              <p className="text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
