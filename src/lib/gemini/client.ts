import { env } from "@/lib/env";

export const geminiConfig = {
  apiKey: env.geminiApiKey,
  model: env.geminiModel
} as const;

export function hasGeminiAccess(): boolean {
  return geminiConfig.apiKey.length > 0;
}
