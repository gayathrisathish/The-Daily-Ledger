"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

async function callGenerate() {
  try {
    const response = await fetch("/api/ai-test", { method: "POST" });
    const data = await response.json();
    if (!response.ok) {
      return `Error: ${data.error ?? "Unknown error"}`;
    }
    return JSON.stringify(data, null, 2);
  } catch (error) {
    return `Error: ${(error as Error).message}`;
  }
}

export function AITestClient() {
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">AI Editorial Test</h1>
        <p className="max-w-2xl text-muted-foreground">
          Developer testing page for generating the daily edition, quiz, flashcards, and glossary.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={async () => {
            setLoading(true);
            const result = await callGenerate();
            setOutput(result);
            setLoading(false);
          }}
        >
          {loading ? "Generating…" : "Generate Edition"}
        </Button>
      </div>
      <pre className="rounded-xl border border-border bg-background/80 p-4 text-sm text-slate-200">{output}</pre>
    </div>
  );
}
