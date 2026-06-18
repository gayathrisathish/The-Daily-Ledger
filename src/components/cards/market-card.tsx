import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MarketStat } from "@/types/content";

export function MarketCard({ symbol, value, change, direction, explanation }: MarketStat): React.JSX.Element {
  const tone =
    direction === "up" ? "text-emerald-500" : direction === "down" ? "text-rose-500" : "text-muted-foreground";

  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-base">{symbol}</CardTitle>
          <Badge variant="outline" className={tone}>
            {change}
          </Badge>
        </div>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{explanation}</p>
      </CardContent>
    </Card>
  );
}