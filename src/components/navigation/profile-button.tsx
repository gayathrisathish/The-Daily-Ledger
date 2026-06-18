"use client";

import type { ButtonHTMLAttributes } from "react";
import { UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProfileButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>): React.JSX.Element {
  return (
    <Button variant="outline" size="sm" className={cn("rounded-full border-border/80 bg-background/70 backdrop-blur", className)} {...props}>
      <UserRound className="h-4 w-4" />
      Profile
    </Button>
  );
}