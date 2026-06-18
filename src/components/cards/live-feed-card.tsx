import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface LiveFeedItem {
  timestamp: string;
  headline: string;
  source: string;
  summary: string;
}

export function LiveFeedCard({ timestamp, headline, source, summary }: LiveFeedItem): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base">{headline}</CardTitle>
          <Badge variant="secondary">{timestamp}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{source}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{summary}</p>
      </CardContent>
    </Card>
  );
}