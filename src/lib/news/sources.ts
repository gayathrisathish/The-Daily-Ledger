import type { NewsSource } from "./types";

export const newsSources: NewsSource[] = [
  {
    id: "reuters-business",
    name: "Reuters Business",
    url: "https://www.reuters.com/business/rss.xml",
    category: "Business"
  },
  {
    id: "reuters-markets",
    name: "Reuters Markets",
    url: "https://www.reuters.com/markets/rss.xml",
    category: "Markets"
  },
  {
    id: "economictimes-markets",
    name: "Economic Times Markets",
    url: "https://economictimes.indiatimes.com/rss/market-news/rssfeed.xml",
    category: "Markets"
  },
  {
    id: "moneycontrol-markets",
    name: "Moneycontrol Markets",
    url: "https://www.moneycontrol.com/rss/market-reports.xml",
    category: "Markets"
  },
  {
    id: "rbi-press-releases",
    name: "RBI Press Releases",
    url: "https://www.rbi.org.in/scripts/BS_PressReleaseFeed.aspx",
    category: "Policy"
  },
  {
    id: "sebi-news",
    name: "SEBI News",
    url: "https://www.sebi.gov.in/sebiweb/home/Lists/LatestPressReleases/PressRelease.xml",
    category: "Policy"
  }
];
