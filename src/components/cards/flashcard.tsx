import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FlashcardProps {
  front: string;
  back: string;
}

export function Flashcard({ front, back }: FlashcardProps): React.JSX.Element {
  return (
    <Card className="min-h-48">
      <CardHeader>
        <CardTitle className="text-base">{front}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{back}</p>
      </CardContent>
    </Card>
  );
}