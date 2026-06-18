import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MarketDashboardItem {
  asset: string;
  value: string;
  dailyChange: string;
  direction: "up" | "down" | "flat";
  explanation: string;
}

interface MarketDashboardProps {
  items: MarketDashboardItem[];
}

export function MarketDashboard({ items }: MarketDashboardProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const icon = item.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : item.direction === "down" ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />;

        return (
          <Card key={item.asset} className="overflow-hidden border-border/70 bg-card/95 shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow">
            <CardHeader className="flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-sm uppercase tracking-[0.22em] text-muted-foreground">{item.asset}</CardTitle>
                <p className="mt-2 text-2xl font-semibold tracking-tight">{item.value}</p>
              </div>
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                  item.direction === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                  item.direction === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  item.direction === "flat" && "bg-secondary text-muted-foreground"
                )}
              >
                {icon}
                {item.dailyChange}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{item.explanation}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
