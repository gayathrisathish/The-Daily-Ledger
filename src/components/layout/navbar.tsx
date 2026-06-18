"use client";

import Link from "next/link";
import type { Route } from "next";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navItems } from "@/lib/site";

import { ProfileButton } from "@/components/navigation/profile-button";
import { SearchButton } from "@/components/navigation/search-button";
import { ThemeToggle } from "@/components/navigation/theme-toggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border/70 bg-primary text-primary-foreground shadow-soft">
            DL
          </span>
          <span className="text-base font-semibold sm:text-lg">The Daily Ledger</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 overflow-x-auto xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href as Route}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                item.href === "/" ? "text-muted-foreground hover:bg-secondary/60 hover:text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <SearchButton />
          <ProfileButton />
          <ThemeToggle />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-border/70 bg-card/80"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-border/60 bg-background/95 px-4 py-4 sm:px-6 lg:hidden lg:px-8">
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-2">
              <SearchButton className="w-full justify-center" />
              <ProfileButton className="w-full justify-center" />
            </div>
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-border/70 bg-card px-4 py-3 text-sm font-medium text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </header>
  );
}