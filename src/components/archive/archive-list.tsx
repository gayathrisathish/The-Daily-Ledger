import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const archiveItems = ["June 18, 2026", "June 17, 2026", "June 16, 2026"] as const;

export function ArchiveList(): React.JSX.Element {
  return (
    <section className="space-y-4">
      {archiveItems.map((item) => (
        <Card key={item}>
          <CardHeader>
            <CardTitle>{item}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Placeholder archive entry.</p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}