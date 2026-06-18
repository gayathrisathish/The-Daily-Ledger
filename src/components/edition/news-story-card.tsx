import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface NewsStoryCardProps {
  headline: string;
  whatHappened: string;
  whyItMatters: string;
  beginnerTranslation: string;
}

export function NewsStoryCard({ headline, whatHappened, whyItMatters, beginnerTranslation }: NewsStoryCardProps) {
  return (
    <Card className="h-full overflow-hidden border-border/70 bg-card/95 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow">
      <CardHeader className="space-y-3 border-b border-border/60 pb-5">
        <CardTitle className="text-xl leading-7 text-balance">{headline}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">What Happened</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{whatHappened}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Why It Matters</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{whyItMatters}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Beginner Translation</p>
          <p className="mt-2 text-base leading-7 text-card-foreground">{beginnerTranslation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
