import { QuizCard } from "@/components/cards/quiz-card";

const quizBlocks = [
  { title: "Daily Quiz", description: "Placeholder daily quiz experience." },
  { title: "Weekly Quiz", description: "Placeholder weekly review experience." },
  { title: "Past Quizzes", description: "Placeholder archive of prior quizzes." }
] as const;

export function QuizSection(): React.JSX.Element {
  return (
    <section className="grid gap-6 md:grid-cols-3">
      {quizBlocks.map((block) => (
        <QuizCard key={block.title} {...block} />
      ))}
    </section>
  );
}