"use client";

import type { ButtonHTMLAttributes } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SearchButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): React.JSX.Element {
  return (
    <Button variant="outline" size="sm" className={cn("rounded-full border-border/80 bg-background/70 backdrop-blur", className)} {...props}>
      <Search className="h-4 w-4" />
      Search
    </Button>
  );
}