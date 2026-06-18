import { PageShell } from "@/components/layout/page-shell";
import { QuizCard } from "@/components/quiz/quiz-card";

const quizzes = [
  {
    title: "Daily Quiz",
    description: "A short recall check based on today\'s edition.",
    questionCount: 5,
    label: "Daily"
  },
  {
    title: "Weekly Quiz",
    description: "A broader review of the week\'s key stories.",
    questionCount: 10,
    label: "Weekly"
  },
  {
    title: "Past Quizzes",
    description: "Review prior sets to strengthen retention.",
    questionCount: 12,
    label: "Archive"
  }
];

export default function QuizCenterPage() {
  return (
    <PageShell title="Quiz Center" description="Auto-generated recall checks to reinforce the concepts and stories you just read.">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.title} {...quiz} />
        ))}
      </section>
    </PageShell>
  );
}