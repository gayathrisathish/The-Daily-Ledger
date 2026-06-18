import type { Route } from "next";

export interface NavItem {
  href: Route;
  label: string;
}

export interface QuickAccessItem extends NavItem {
  description: string;
}
