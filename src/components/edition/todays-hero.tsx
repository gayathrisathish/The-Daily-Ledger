import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TodaysHero(): React.JSX.Element {
  return (
    <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-background via-card to-primary/5">
      <CardHeader className="space-y-4">
        <Badge className="w-fit">Today\'s Edition</Badge>
        <CardTitle className="text-3xl md:text-4xl">Your daily finance lesson starts here.</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Placeholder copy for the main daily briefing, written to feel like an editorial learning journal.
        </p>
      </CardContent>
    </Card>
  );
}