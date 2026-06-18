import type { NewsSourceStatus } from "@/lib/news/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewsSourceCardProps {
  status: NewsSourceStatus;
}

export function NewsSourceCard({ status }: NewsSourceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{status.source.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Status</span>
          <span>{status.status === "ok" ? "OK" : status.status === "empty" ? "Empty" : "Failed"}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>Articles Pulled</span>
          <span>{status.fetchedArticles}</span>
        </div>
        {status.error ? <p className="text-sm text-destructive">{status.error}</p> : null}
      </CardContent>
    </Card>
  );
}
