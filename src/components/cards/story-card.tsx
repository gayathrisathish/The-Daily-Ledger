import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EditionItem } from "@/types/content";

export function StoryCard({ title, whatHappened, whyItMatters, beginnerTranslation }: EditionItem): React.JSX.Element {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
        <p><span className="font-medium text-foreground">What happened:</span> {whatHappened}</p>
        <p><span className="font-medium text-foreground">Why it matters:</span> {whyItMatters}</p>
        <p><span className="font-medium text-foreground">Beginner translation:</span> {beginnerTranslation}</p>
      </CardContent>
    </Card>
  );
}