import { CloseIcon, SparklesIcon } from "./icons";
import type { QuizQuestion } from "./types";

type QuizCardProps = {
  question: QuizQuestion;
  currentIndex: number;
  total: number;
  isPending: boolean;
  onAnswer: (answerIndex: number) => void;
  onCancel: () => void;
};

export function QuizCard({
  question,
  currentIndex,
  total,
  isPending,
  onAnswer,
  onCancel,
}: QuizCardProps) {
  return (
    <section className="mx-auto mt-10 max-w-105 rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-slate-900" />
            <h2 className="text-lg font-semibold text-slate-950">Quick test</h2>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Take a quick test about your knowledge from the summary content.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-900"
          aria-label="Close quiz"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="mt-6 flex items-start justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-4">
        <p className="text-base font-semibold leading-7 text-slate-900">
          {question.prompt}
        </p>
        <span className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-slate-500 shadow-sm">
          {currentIndex + 1} / {total}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {question.options.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => onAnswer(index)}
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-950 hover:bg-slate-50 disabled:cursor-progress disabled:opacity-60"
          >
            {option}
          </button>
        ))}
      </div>
    </section>
  );
}
