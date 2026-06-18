import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewsItem } from "@/lib/news/types";

interface NewsStoryCardProps {
  story: NewsItem;
}

export function NewsStoryCard({ story }: NewsStoryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{story.summary}</p>
        <div className="grid gap-1 text-xs text-muted-foreground">
          <span>Source: {story.source}</span>
          <span>Category: {story.category}</span>
          <span>Published: {new Date(story.publishedAt).toLocaleString()}</span>
          <a href={story.url} target="_blank" rel="noreferrer" className="text-primary underline">
            Read original
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
