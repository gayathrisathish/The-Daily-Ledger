import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface BigStorySection {
  label: string;
  body: string;
}

interface BigStoryProps {
  headline: string;
  sections: BigStorySection[];
}

export function BigStory({ headline, sections }: BigStoryProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
      <CardHeader className="border-b border-border/60 pb-6">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Today&apos;s Big Story</p>
        <CardTitle className="max-w-4xl text-3xl leading-tight text-balance md:text-4xl">{headline}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6 lg:grid-cols-2">
        {sections.map((section) => (
          <div key={section.label} className="rounded-[1.25rem] border border-border/70 bg-background/70 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">{section.label}</p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
