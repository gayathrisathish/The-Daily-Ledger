import { PageShell } from "@/components/layout/page-shell";
import { FeatureCard } from "@/components/cards/feature-card";

const companies = [
  {
    title: "Reliance",
    description: "What the company does, how it makes money, and why its news matters to broader Indian markets.",
    href: "/companies/reliance"
  },
  {
    title: "HDFC Bank",
    description: "A banking lens on lending, deposits, and the credit cycle.",
    href: "/companies/hdfc-bank"
  },
  {
    title: "Apple",
    description: "A global consumer and platform business with a large ecosystem effect.",
    href: "/companies/apple"
  }
];

export default function CompaniesPage() {
  return (
    <PageShell title="Companies" description="A company hub that explains business models, recent news, and investor relevance.">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {companies.map((company) => (
          <FeatureCard key={company.title} title={company.title} description={company.description} href={company.href as never} badge="Company" />
        ))}
      </section>
    </PageShell>
  );
}