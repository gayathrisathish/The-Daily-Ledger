const required = (value: string | undefined, name: string): string => {
  if (!value) {
    throw new Error(`${name} is not set`);
  }

  return value;
};

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  gnewsApiKey: process.env.GNEWS_API_KEY ?? "",
  activeModel: process.env.ACTIVE_MODEL ?? "gemini",
  openRouterApiKey: process.env.OPENROUTER_API_KEY ?? "",
  openRouterBaseUrl: process.env.OPENROUTER_BASE_URL ?? "",
  geminiApiKey: process.env.GEMINI_API_KEY ?? "",
  geminiModel: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
  deepseekModel: process.env.DEEPSEEK_MODEL ?? "deepseek-v1",
  qwenModel: process.env.QWEN_MODEL ?? "qwen-2"
} as const;

export const getRequiredEnv = (name: keyof typeof env): string => {
  return required(env[name], name);
};
