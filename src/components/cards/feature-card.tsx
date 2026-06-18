import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  href?: string;
  badge?: string;
  className?: string;
}

export function FeatureCard({ title, description, icon, href, badge, className }: FeatureCardProps) {
  const content = (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.18, ease: "easeOut" }} className={cn("h-full", className)}>
      <Card className="group h-full overflow-hidden transition-shadow duration-200 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-secondary/70 text-primary">
              {icon}
            </div>
            {badge ? <Badge variant="accent" className="w-fit rounded-full px-3 py-1 text-[0.7rem]">{badge}</Badge> : null}
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-base leading-7">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-primary">Open section</span>
          <ArrowRight className="h-4 w-4 text-primary transition-transform duration-200 group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </motion.article>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="block h-full">
      {content}
    </Link>
  );
}