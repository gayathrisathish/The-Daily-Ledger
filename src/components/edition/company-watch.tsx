import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface CompanyWatchItem {
  company: string;
  whatHappened: string;
  whyInvestorsCare: string;
}

interface CompanyWatchProps {
  items: CompanyWatchItem[];
}

export function CompanyWatch({ items }: CompanyWatchProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <Card key={item.company} className="overflow-hidden border-border/70 bg-card/95 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow">
          <CardHeader className="border-b border-border/60 pb-5">
            <CardTitle className="text-xl">{item.company}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">What Happened</p>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{item.whatHappened}</p>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Why Investors Care</p>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{item.whyInvestorsCare}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
