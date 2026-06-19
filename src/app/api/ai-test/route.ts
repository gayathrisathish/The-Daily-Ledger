import { NextResponse } from "next/server";
import { generateDailyLedgerEdition } from "@/lib/ai/editorial-service";

export async function POST() {
  try {
    const result = await generateDailyLedgerEdition();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
