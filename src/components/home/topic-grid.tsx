import { TopicCard, type TopicCardProps } from "@/components/home/topic-card";

interface TopicGridProps {
  items: TopicCardProps[];
}

export function TopicGrid({ items }: TopicGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <TopicCard key={item.title} {...item} />
      ))}
    </div>
  );
}