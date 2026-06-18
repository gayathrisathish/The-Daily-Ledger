import { FeatureCard, type FeatureCardProps } from "@/components/home/feature-card";

interface FeatureGridProps {
  items: FeatureCardProps[];
}

export function FeatureGrid({ items }: FeatureGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <FeatureCard key={item.title} {...item} />
      ))}
    </div>
  );
}