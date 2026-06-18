import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/app/providers";

import "@/styles/globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "The Daily Ledger",
    template: "%s | The Daily Ledger"
  },
  description: "A financial learning platform built around daily news, active recall, and clarity."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <body>
        <Providers>
          <div className="min-h-dvh bg-background text-foreground">
            <Navbar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}