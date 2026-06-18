import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizCardProps {
  title: string;
  description: string;
  questionCount: number;
  label: string;
}

export function QuizCard({ title, description, questionCount, label }: QuizCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{questionCount} questions</p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">Ready</span>
      </CardContent>
    </Card>
  );
}