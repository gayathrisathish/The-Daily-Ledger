import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FinanceSchoolCardProps {
  concept: string;
  definition: string;
  simpleExample: string;
  whyProfessionalsCare: string;
  whyYouSawItToday: string;
}

export function FinanceSchoolCard({ concept, definition, simpleExample, whyProfessionalsCare, whyYouSawItToday }: FinanceSchoolCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
      <CardHeader className="border-b border-border/60 pb-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Finance School</p>
        <CardTitle className="text-2xl md:text-3xl">{concept}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 pt-5 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Definition</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{definition}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Simple Example</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{simpleExample}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Why Professionals Care</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{whyProfessionalsCare}</p>
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Why You Saw It Today</p>
          <p className="mt-2 text-base leading-7 text-muted-foreground">{whyYouSawItToday}</p>
        </div>
      </CardContent>
    </Card>
  );
}
