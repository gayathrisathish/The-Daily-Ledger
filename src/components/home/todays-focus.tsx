"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TodaysFocusProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export function TodaysFocus({ title, description, href, ctaLabel }: TodaysFocusProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
        <CardHeader className="space-y-4 border-b border-border/70 pb-6">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Today&apos;s Focus</p>
          <CardTitle className="max-w-3xl text-3xl md:text-4xl">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">{description}</p>
          <Link href={href} className={cn(buttonVariants({ variant: "default", size: "lg" }), "shrink-0 px-7")}>
            {ctaLabel}
          </Link>
        </CardContent>
      </Card>
    </motion.section>
  );
}