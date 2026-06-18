import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface WatchItem {
  title: string;
  description: string;
}

interface WhatToWatchProps {
  items: WatchItem[];
}

export function WhatToWatch({ items }: WhatToWatchProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className="overflow-hidden border-border/70 bg-card/95 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow">
          <CardHeader className="border-b border-border/60 pb-5">
            <CardTitle className="text-xl">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="pt-5">
            <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
