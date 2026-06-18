import { NextResponse } from "next/server";
import { generateDailyLedgerEdition } from "@/lib/ai/editorial-service";

export async function POST() {
  try {
    const result = await generateDailyLedgerEdition();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
