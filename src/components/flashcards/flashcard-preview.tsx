import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FlashcardPreviewProps {
  front: string;
  back: string;
  deckName: string;
}

export function FlashcardPreview({ front, back, deckName }: FlashcardPreviewProps) {
  return (
    <Card className="border-dashed">
      <CardHeader>
        <CardTitle className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{deckName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Front</p>
          <p className="mt-2 text-lg font-medium">{front}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">Back</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{back}</p>
        </div>
      </CardContent>
    </Card>
  );
}