import type { Route } from "next";

export interface ContentCard {
  title: string;
  description: string;
  href?: Route;
}

export interface MarketStat {
  symbol: string;
  value: string;
  change: string;
  direction: "up" | "down" | "flat";
  explanation: string;
}

export interface EditionItem {
  title: string;
  whatHappened: string;
  whyItMatters: string;
  beginnerTranslation: string;
}
