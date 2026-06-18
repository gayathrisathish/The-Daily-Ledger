interface PageHeaderProps {
  title: string;
  description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mx-auto max-w-4xl space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">{title}</h1>
      <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
    </header>
  );
}
