"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { QuestionCard, type QuestionCardProps } from "@/components/quiz/question-card";
import { ResultsCard } from "@/components/quiz/results-card";

interface QuizStudyProps {
  questions: Omit<QuestionCardProps, "selectedAnswer" | "onSelect" | "locked">[];
}

export function QuizStudy({ questions }: QuizStudyProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const score = useMemo(
    () => questions.reduce((total, question) => total + (answers[question.questionNumber] === question.correctAnswer ? 1 : 0), 0),
    [answers, questions]
  );

  const allAnswered = questions.every((question) => answers[question.questionNumber]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 xl:grid-cols-2">
        {questions.map((question) => (
          <QuestionCard
            key={question.questionNumber}
            {...question}
            selectedAnswer={answers[question.questionNumber] ?? null}
            locked={Boolean(answers[question.questionNumber])}
            onSelect={(value) => setAnswers((current) => ({ ...current, [question.questionNumber]: value }))}
          />
        ))}
      </div>

      {allAnswered ? <ResultsCard score={score} total={questions.length} /> : null}

      <section className="space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Review Mistakes</h2>
        <div className="grid gap-4">
          {questions
            .filter((question) => answers[question.questionNumber] && answers[question.questionNumber] !== question.correctAnswer)
            .map((question) => (
              <div key={question.questionNumber} className="rounded-[1.25rem] border border-border/70 bg-card/90 p-5">
                <p className="text-lg font-semibold tracking-tight">{question.question}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{question.explanation}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Why it matters: {question.whyItMatters}</p>
              </div>
            ))}
          {allAnswered && Object.values(answers).every((value, index) => value === questions[index]?.correctAnswer) ? (
            <div className="rounded-[1.25rem] border border-dashed border-border/70 bg-card/70 p-5 text-center text-muted-foreground">No mistakes to review.</div>
          ) : null}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Button type="button" variant="outline" onClick={() => setAnswers({})}>
          Reset Quiz
        </Button>
      </div>
    </div>
  );
}
