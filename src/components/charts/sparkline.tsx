import { cn } from "@/lib/utils";

interface SparklineProps {
  trend?: "up" | "down" | "flat";
  className?: string;
}

export function Sparkline({ trend = "flat", className }: SparklineProps) {
  const points =
    trend === "up"
      ? "4,30 20,24 36,26 52,14 68,18 84,8 100,12"
      : trend === "down"
        ? "4,10 20,14 36,12 52,22 68,18 84,28 100,24"
        : "4,20 20,20 36,20 52,20 68,20 84,20 100,20";

  return (
    <svg viewBox="0 0 104 32" className={cn("h-10 w-full", className)} role="img" aria-hidden="true">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className={cn(
          trend === "up" && "text-emerald-500",
          trend === "down" && "text-rose-500",
          trend === "flat" && "text-muted-foreground"
        )}
      />
    </svg>
  );
}