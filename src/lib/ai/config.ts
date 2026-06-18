import { env } from "@/lib/env";
import type { AIProviderKey } from "@/lib/ai/types";

export const activeProvider = (env.activeModel as AIProviderKey | undefined) ?? "gemini";

export const modelConfig: Record<AIProviderKey, { provider: string; model: string }> = {
  gemini: {
    provider: "gemini",
    model: env.geminiModel ?? "gemini-2.0-flash"
  },
  deepseek: {
    provider: "deepseek",
    model: env.deepseekModel ?? "deepseek-v1"
  },
  qwen: {
    provider: "qwen",
    model: env.qwenModel ?? "qwen-2"
  }
};
