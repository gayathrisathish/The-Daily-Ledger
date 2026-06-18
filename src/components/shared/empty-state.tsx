import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="border-dashed border-border/70 bg-card/80">
      <CardContent className="py-10 text-center">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
