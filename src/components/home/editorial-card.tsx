"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Brain, GraduationCap, Landmark, Newspaper, type LucideIcon } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const editorialIcons = {
  newspaper: Newspaper,
  graduationCap: GraduationCap,
  brain: Brain,
  landmark: Landmark
} as const;

type EditorialIconName = keyof typeof editorialIcons;

interface EditorialCardProps {
  title: string;
  description: string;
  href?: Route;
  iconName?: EditorialIconName;
  meta?: string;
  className?: string;
}

export function EditorialCard({ title, description, href, iconName, meta, className }: EditorialCardProps) {
  const Icon = iconName ? editorialIcons[iconName] : null;

  const content = (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.18, ease: "easeOut" }} className={cn("h-full", className)}>
      <Card className="h-full overflow-hidden border-border/80 bg-card/90">
        <CardHeader className="space-y-4">
          {Icon ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border/70 bg-secondary/70 text-primary">
              <Icon className="h-5 w-5" />
            </div>
          ) : null}
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-base leading-7">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-primary">{meta ?? "Open section"}</span>
          <span className="text-sm font-medium text-muted-foreground">Read more</span>
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