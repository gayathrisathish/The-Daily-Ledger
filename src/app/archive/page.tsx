import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const archiveEntries = [
  { date: "2026-06-18", title: "Rates, earnings, and rupee moves" },
  { date: "2026-06-17", title: "Inflation watch and sector rotation" },
  { date: "2026-06-16", title: "Tech leadership and macro uncertainty" }
];

export default function ArchivePage() {
  return (
    <PageShell title="Archive" description="Search and revisit prior editions by date.">
      <section className="grid gap-4">
        {archiveEntries.map((entry) => (
          <Card key={entry.date} className="flex items-center justify-between gap-4">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">{entry.title}</CardTitle>
              <p className="text-sm text-muted-foreground">Edition date</p>
            </CardHeader>
            <CardContent className="text-sm font-medium text-primary">{entry.date}</CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}