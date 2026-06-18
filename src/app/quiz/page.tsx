import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { QuizStudy } from "@/components/quiz/quiz-study";
import { EmptyState } from "@/components/shared/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getLatestEdition } from "@/lib/data/editions";
import { getByEditionId as getQuizzesByEditionId, getQuestionsByQuizId } from "@/lib/data/quizzes";

export default async function QuizPage() {
  const edition = await getLatestEdition();

  if (!edition) {
    return <EmptyState title="No quiz available" description="A quiz will appear once the next edition is published." />;
  }

  const quizzes = await getQuizzesByEditionId(edition.id);
  const quiz = quizzes[0];

  if (!quiz) {
    return <EmptyState title="No quiz available" description="This edition does not have any questions yet." />;
  }

  const questions = await getQuestionsByQuizId(quiz.id);

  const formattedQuestions = questions.map((question, index) => ({
    questionNumber: index + 1,
    question: question.question,
    options: [
      { label: question.option_a, value: "a" },
      { label: question.option_b, value: "b" },
      { label: question.option_c, value: "c" },
      { label: question.option_d, value: "d" }
    ],
    correctAnswer: question.correct_answer,
    explanation: question.explanation,
    whyItMatters: "Review why this idea matters for market context today."
  }));

  return (
    <PageShell title="Quiz Center" description="Active recall questions based on today’s edition to reinforce retention.">
      <PageHeader
        title="Today's Quiz"
        description={`${formattedQuestions.length} questions · Estimated time: ${Math.max(3, Math.ceil(formattedQuestions.length / 2))} minutes · Progress updates as you answer.`}
      />

      {formattedQuestions.length > 0 ? (
        <QuizStudy questions={formattedQuestions} />
      ) : (
        <EmptyState title="No questions to display" description="This quiz will show up shortly." />
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/today" className={cn(buttonVariants({ variant: "outline" }))}>
          Review Today's Edition
        </Link>
        <Link href="/flashcards" className={cn(buttonVariants({ variant: "default" }))}>
          Study Flashcards
        </Link>
      </div>
    </PageShell>
  );
}
