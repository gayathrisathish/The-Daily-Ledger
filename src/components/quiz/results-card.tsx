import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResultsCardProps {
  score: number;
  total: number;
}

export function ResultsCard({ score, total }: ResultsCardProps) {
  const percentage = Math.round((score / total) * 100);
  const message = percentage >= 90 ? "Excellent understanding of today's edition." : percentage >= 70 ? "Strong work. You captured the main ideas." : "Review the edition once more to lock in the details.";

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
      <CardHeader className="border-b border-border/60 pb-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Results</p>
        <CardTitle className="text-3xl">{score}/{total} Correct</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <p className="text-5xl font-bold tracking-tight text-card-foreground">{percentage}%</p>
        <p className="text-base leading-7 text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
