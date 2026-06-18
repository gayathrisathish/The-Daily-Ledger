import type { NavItem } from "@/types/navigation";

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/edition", label: "Today\'s Edition" },
  { href: "/finance-school", label: "Finance School" },
  { href: "/companies", label: "Companies" },
  { href: "/careers", label: "Careers" },
  { href: "/quiz", label: "Quiz Center" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/archive", label: "Archive" }
];

export const quickAccessItems = [
  { label: "Edition", href: "/edition", description: "Today\'s main read" },
  { label: "School", href: "/finance-school", description: "Learn a concept" },
  { label: "Quiz", href: "/quiz", description: "Test your recall" },
  { label: "Flashcards", href: "/flashcards", description: "Review what matters" }
] as const;
