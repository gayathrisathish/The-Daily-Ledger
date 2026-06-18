import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface QuestionCardProps {
  questionNumber: number;
  question: string;
  options: QuestionOption[];
  selectedAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  whyItMatters: string;
  onSelect: (value: string) => void;
  locked?: boolean;
}

export function QuestionCard({ questionNumber, question, options, selectedAnswer, correctAnswer, explanation, whyItMatters, onSelect, locked }: QuestionCardProps) {
  const answered = selectedAnswer !== null;

  return (
    <Card className="overflow-hidden border-border/70 bg-card/95 shadow-soft">
      <CardHeader className="border-b border-border/60 pb-5">
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">Question {questionNumber}</p>
        <CardTitle className="text-2xl leading-8 text-balance">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-5">
        <div className="grid gap-3">
          {options.map((option) => {
            const isCorrect = option.value === correctAnswer;
            const isSelected = option.value === selectedAnswer;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => !locked && onSelect(option.value)}
                className={cn(
                  "rounded-[1.25rem] border px-4 py-3 text-left text-base transition-colors duration-200",
                  locked && "cursor-not-allowed",
                  isSelected && isCorrect && "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
                  isSelected && !isCorrect && "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
                  !isSelected && "border-border/70 bg-background/70 hover:bg-background"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {answered ? (
          <div className="space-y-3 rounded-[1.25rem] border border-border/70 bg-background/80 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">Feedback</p>
            <p className="text-base font-medium text-card-foreground">{selectedAnswer === correctAnswer ? "Correct" : "Incorrect"}</p>
            <p className="text-sm leading-6 text-muted-foreground">{explanation}</p>
            <p className="text-sm leading-6 text-muted-foreground">Why it matters: {whyItMatters}</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
