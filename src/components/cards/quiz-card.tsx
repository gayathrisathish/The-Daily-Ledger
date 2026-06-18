import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface QuizCardProps {
  title: string;
  description: string;
}

export function QuizCard({ title, description }: QuizCardProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}