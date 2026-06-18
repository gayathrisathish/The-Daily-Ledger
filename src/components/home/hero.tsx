import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HomeHero(): React.JSX.Element {
  return (
    <Card className="border-primary/15 bg-gradient-to-br from-background via-card to-primary/5">
      <CardHeader className="space-y-4">
        <Badge className="w-fit">Morning Briefing</Badge>
        <CardTitle className="text-3xl md:text-5xl">Learn the markets by reading what matters today.</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
          Placeholder content for the homepage hero and value proposition.
        </p>
      </CardContent>
    </Card>
  );
}