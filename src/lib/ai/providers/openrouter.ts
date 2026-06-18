import { env } from "@/lib/env";

const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

export interface OpenRouterRequest {
  provider: string;
  model: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
}

export interface OpenRouterResponse {
  status: "ok" | "error";
  output?: string;
  error?: string;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function executeOpenRouterRequest(request: OpenRouterRequest): Promise<string> {
  const url = env.openRouterBaseUrl;
  if (!url) {
    throw new Error("OPENROUTER_BASE_URL is not set");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.openRouterApiKey}`
  };

  if (!env.openRouterApiKey) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }

  let attempt = 0;
  let lastError: Error | null = null;

  while (attempt <= MAX_RETRIES) {
    attempt += 1;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: request.model,
          provider: request.provider,
          input: request.prompt,
          temperature: request.temperature ?? 0.2,
          top_p: request.topP ?? 1,
          max_tokens: request.maxTokens ?? 1200
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        if (attempt <= MAX_RETRIES) {
          await delay(RETRY_DELAY * attempt);
          continue;
        }
        throw new Error("Rate limit exceeded");
      }

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`OpenRouter request failed: ${response.status} ${body}`);
      }

      const parsed = await response.json();

      if (typeof parsed !== "object" || parsed === null) {
        throw new Error("OpenRouter returned invalid JSON");
      }

      if (parsed.error) {
        throw new Error(`OpenRouter error: ${parsed.error}`);
      }

      const output = typeof parsed.output === "string" ? parsed.output : parsed.result ?? undefined;
      if (!output || typeof output !== "string") {
        throw new Error("OpenRouter returned no output");
      }

      return output;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        lastError = new Error("OpenRouter request timed out");
      } else if (error instanceof Error) {
        lastError = error;
      } else {
        lastError = new Error("Unknown OpenRouter error");
      }

      if (attempt > MAX_RETRIES) {
        throw lastError;
      }

      await delay(RETRY_DELAY * attempt);
    }
  }

  throw new Error("OpenRouter request failed after retries");
}
