import { LiveFeedCard } from "@/components/cards/live-feed-card";
import { SectionCard } from "@/components/cards/section-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { navItems } from "@/lib/site";

const liveFeed = [
  {
    timestamp: "09:10",
    headline: "Markets open higher on placeholder catalyst",
    source: "Reuters",
    summary: "Placeholder summary for the live news feed."
  },
  {
    timestamp: "08:45",
    headline: "Economic data updates shape rate expectations",
    source: "RBI",
    summary: "Placeholder summary for the second live item."
  }
] as const;

export function HomeSections(): React.JSX.Element {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Live News Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {liveFeed.map((item) => (
            <LiveFeedCard key={item.headline} {...item} />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Navigation</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {navItems.map((item) => (
            <SectionCard key={item.href} title={item.label} description={`Open ${item.label.toLowerCase()}.`} href={item.href} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}