import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ConceptCardProps {
  title: string;
  definition: string;
}

export function ConceptCard({ title, definition }: ConceptCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{definition}</p>
      </CardContent>
    </Card>
  );
}