import { runGenerateEditionPipeline } from "@/lib/pipeline/service";
import type { GenerateEditionResult } from "@/lib/pipeline/service";

export async function generateDailyLedgerEdition(): Promise<GenerateEditionResult> {
  return runGenerateEditionPipeline();
}
