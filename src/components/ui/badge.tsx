import { cn } from "@/lib/utils";

export interface BadgeProps {
  variant?: "default" | "secondary" | "outline" | "accent";
  className?: string;
  children?: any;
}

const badgeStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "border-transparent bg-primary text-primary-foreground",
  secondary: "border-transparent bg-secondary text-secondary-foreground",
  outline: "border border-border bg-transparent text-foreground",
  accent: "border-transparent bg-accent/10 text-accent"
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors", badgeStyles[variant], className)} {...props} />;
}
