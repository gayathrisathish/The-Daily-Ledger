import { PageShell } from "@/components/layout/page-shell";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const concepts = [
  {
    title: "Inflation",
    definition: "A rise in general prices over time.",
    example: "If groceries and rent are more expensive than last year, inflation is part of the reason.",
    care: "Professionals watch inflation because it influences rates, spending, and company margins."
  },
  {
    title: "Bond Yield",
    definition: "The return an investor earns on a bond.",
    example: "When bond prices fall, yields usually rise.",
    care: "Yields are a core reference point for equity valuations and borrowing costs."
  },
  {
    title: "EBITDA",
    definition: "Earnings before interest, taxes, depreciation, and amortization.",
    example: "Analysts use it to compare operating performance across businesses.",
    care: "Professionals like it because it helps normalize company comparisons."
  },
  {
    title: "DCF",
    definition: "Discounted cash flow, a method for estimating intrinsic value.",
    example: "Future cash flows are discounted back to today\'s value.",
    care: "It\'s a classic valuation model used in research and investment banking."
  }
];

export default function FinanceSchoolPage() {
  return (
    <PageShell title="Finance School" description="A searchable concept library built for beginners who want repeatable explanations and real context.">
      <section className="space-y-4">
        <div className="max-w-xl">
          <Input placeholder="Search concepts like inflation, EBITDA, DCF, or bond yield" aria-label="Search finance concepts" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {concepts.map((concept) => (
            <Card key={concept.title}>
              <CardHeader>
                <CardTitle>{concept.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-6 text-muted-foreground">
                <p><span className="font-medium text-foreground">Definition:</span> {concept.definition}</p>
                <p><span className="font-medium text-foreground">Example:</span> {concept.example}</p>
                <p><span className="font-medium text-foreground">Why professionals care:</span> {concept.care}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </PageShell>
  );
}