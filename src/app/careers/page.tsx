import { PageShell } from "@/components/layout/page-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const careers = [
  {
    title: "Investment Banking",
    description: "Understand deal-making, valuations, and capital raising workflows."
  },
  {
    title: "Equity Research",
    description: "Learn how analysts model businesses and publish stock opinions."
  },
  {
    title: "Asset Management",
    description: "Explore portfolio construction, risk, and long-term decision-making."
  },
  {
    title: "Venture Capital",
    description: "See how early-stage investing evaluates teams, markets, and upside."
  }
];

export default function CareersPage() {
  return (
    <PageShell title="Careers" description="A learning center for finance roles, responsibilities, and the language professionals use.">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {careers.map((career) => (
          <Card key={career.title}>
            <CardHeader>
              <CardTitle>{career.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">{career.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </PageShell>
  );
}