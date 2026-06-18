import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MarketStat } from "@/types/content";

import { Sparkline } from "@/components/charts/sparkline";

interface StatCardProps {
  stat: MarketStat;
  className?: string;
}

export function StatCard({ stat, className }: StatCardProps) {
  const icon =
    stat.direction === "up" ? <ArrowUpRight className="h-4 w-4" /> : stat.direction === "down" ? <ArrowDownRight className="h-4 w-4" /> : <Minus className="h-4 w-4" />;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div>
          <CardTitle className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{stat.symbol}</CardTitle>
          <p className="mt-2 text-2xl font-semibold">{stat.value}</p>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
            stat.direction === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
            stat.direction === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
            stat.direction === "flat" && "bg-secondary text-muted-foreground"
          )}
        >
          {icon}
          {stat.change}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Sparkline trend={stat.direction} />
        <p className="text-sm leading-6 text-muted-foreground">{stat.explanation}</p>
      </CardContent>
    </Card>
  );
}