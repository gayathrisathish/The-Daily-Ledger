"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export interface TopicCardProps {
  title: string;
  description: string;
  href: Route;
}

export function TopicCard({ title, description, href }: TopicCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="h-full"
    >
      <Link href={href} className="block h-full">
        <Card className="group h-full border-border/70 bg-card/95 transition-shadow duration-200 hover:shadow-glow">
          <CardContent className="flex h-full flex-col justify-between gap-5 p-6 sm:p-7">
            <div className="space-y-3">
              <p className="text-xl font-semibold tracking-tight text-card-foreground">{title}</p>
              <p className="text-base leading-7 text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-1">
              Explore
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}