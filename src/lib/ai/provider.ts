import { env } from "@/lib/env";
import { GeminiProvider } from "@/lib/ai/providers/gemini";
import { DeepSeekProvider } from "@/lib/ai/providers/deepseek";
import { QwenProvider } from "@/lib/ai/providers/qwen";
import type { AIProvider, AIProviderKey } from "@/lib/ai/types";

const providers: Record<AIProviderKey, AIProvider> = {
  gemini: new GeminiProvider(),
  deepseek: new DeepSeekProvider(),
  qwen: new QwenProvider()
};

export function getAiProvider(): AIProvider {
  const active = (env.activeModel as AIProviderKey | undefined) ?? "gemini";

  if (!providers[active]) {
    throw new Error(`Unsupported AI provider: ${active}`);
  }

  return providers[active];
}
