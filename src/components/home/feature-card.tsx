"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { Brain, GraduationCap, Newspaper, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const featureIcons = {
  newspaper: Newspaper,
  graduationCap: GraduationCap,
  brain: Brain
} as const;

export type FeatureIconName = keyof typeof featureIcons;

export interface FeatureCardProps {
  title: string;
  description: string;
  iconName: FeatureIconName;
  href: Route;
  className?: string;
}

export function FeatureCard({ title, description, iconName, href, className }: FeatureCardProps) {
  const Icon = featureIcons[iconName];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={cn("h-full", className)}
    >
      <Link href={href} className="block h-full">
        <Card className="group h-full overflow-hidden border-border/70 bg-card/95 transition-shadow duration-200 hover:shadow-glow">
          <CardContent className="flex h-full flex-col gap-6 p-6 sm:p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold tracking-tight text-card-foreground">{title}</h3>
              <p className="text-base leading-7 text-muted-foreground">{description}</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}