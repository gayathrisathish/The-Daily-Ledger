import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RankedNewsItem } from "@/lib/news/types";

interface RankedStoryCardProps {
  story: RankedNewsItem;
  compact?: boolean;
}

export function RankedStoryCard({ story, compact = false }: RankedStoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{story.title}</CardTitle>
          <span className="rounded-full bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-secondary-foreground">
            {(story.totalScore * 100).toFixed(0)}
          </span>
        </div>
      </CardHeader>
      <CardContent className={compact ? "space-y-2" : "space-y-4"}>
        <p className="text-sm text-muted-foreground">{story.summary}</p>
        <div className="grid gap-2 text-xs text-muted-foreground">
          <span>Source: {story.source}</span>
          <span>Published: {new Date(story.publishedAt).toLocaleString()}</span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <span>Market: {(story.marketImpactScore * 100).toFixed(0)}</span>
            <span>India: {(story.indiaRelevanceScore * 100).toFixed(0)}</span>
            <span>Learn: {(story.educationalValueScore * 100).toFixed(0)}</span>
            <span>Fresh: {(story.recencyScore * 100).toFixed(0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
