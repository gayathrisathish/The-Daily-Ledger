type PipelineStage =
  | "articles_fetched"
  | "articles_stored"
  | "articles_ranked"
  | "ranked_stories_loaded"
  | "ai_generation_started"
  | "ai_generation_completed"
  | "edition_saved"
  | "quiz_saved"
  | "flashcards_saved"
  | "glossary_saved";

export type PipelineLogEntry = {
  stage: PipelineStage;
  message: string;
  timestamp: string;
  data?: Record<string, unknown>;
};

const logs: PipelineLogEntry[] = [];

export function pipelineLog(stage: PipelineStage, message: string, data?: Record<string, unknown>): void {
  const entry: PipelineLogEntry = {
    stage,
    message,
    timestamp: new Date().toISOString(),
    data
  };

  logs.push(entry);
  console.log(`[pipeline:${stage}] ${message}`, data ?? "");
}

export function getPipelineLogs(): PipelineLogEntry[] {
  return [...logs];
}

export function clearPipelineLogs(): void {
  logs.length = 0;
}
