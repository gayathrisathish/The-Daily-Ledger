import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentCard } from "@/types/content";

export function SectionCard({ title, description, href }: ContentCard): React.JSX.Element {
  const content = (
    <Card className="h-full transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-glow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{href ? <span className="text-sm font-medium text-primary">Open section</span> : null}</CardContent>
    </Card>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}