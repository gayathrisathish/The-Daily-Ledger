import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { get } from "@/lib/data/editions";
import { EmptyState } from "@/components/shared/empty-state";

export default async function ArchivePage() {
  const editions = await get();

  if (editions.length === 0) {
    return <EmptyState title="No archive available" description="Previous editions will appear here once they are published." />;
  }

  return (
    <PageShell title="Archive" description="Search and revisit prior editions by date.">
      <section className="grid gap-4">
        {editions.map((edition) => (
          <Link key={edition.id} href={`/today/${edition.id}`}>
            <Card className="flex cursor-pointer items-center justify-between gap-4 transition hover:border-primary/40">
              <CardHeader className="space-y-1">
                <CardTitle className="text-base">
                  {new Date(edition.edition_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{edition.market_mood}</p>
              </CardHeader>
              <CardContent className="text-sm font-medium text-primary">View edition</CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
