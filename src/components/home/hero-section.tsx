"use client";

import Link from "next/link";
import type { Route } from "next";
import { motion } from "framer-motion";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta: {
    label: string;
    href: Route;
  };
  secondaryCta: {
    label: string;
    href: Route;
  };
}

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card px-6 py-16 shadow-soft sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.05),transparent_34%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <p className="text-sm font-medium uppercase tracking-[0.26em] text-muted-foreground">A modern financial learning journal</p>
        <h1 className="mt-5 max-w-4xl text-5xl font-bold tracking-tight text-foreground md:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">{subtitle}</p>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link href={primaryCta.href} className={cn(buttonVariants({ variant: "default", size: "lg" }), "min-w-[13rem] px-7")}> 
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-[13rem] px-7")}> 
            {secondaryCta.label}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}