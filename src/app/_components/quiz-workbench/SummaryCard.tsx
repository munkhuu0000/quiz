import type { ArticleRecord } from "./types";
import { SparklesIcon } from "./icons";

type SummaryCardProps = {
  article: ArticleRecord;
  isSaved: boolean;
  isPending: boolean;
  isQuizPending: boolean;
  onSeeContent: () => void;
  onSave: () => void;
  onTakeQuiz: () => void;
};

export function SummaryCard({
  article,
  isSaved,
  isPending,
  isQuizPending,
  onSeeContent,
  onSave,
  onTakeQuiz,
}: SummaryCardProps) {
  return (
    <section className="mx-auto max-w-140 rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-slate-900" />
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Summarized result
            </p>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">
            {article.title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaved || isPending}
          className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
            isSaved
              ? "bg-emerald-50 text-emerald-700"
              : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
          }`}
        >
          {isSaved ? "Saved to history" : "Save article"}
        </button>
      </div>

      <div className="mt-5 space-y-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
        {article.summary.split("\n\n").map((paragraph) => (
          <p key={paragraph} className="text-sm leading-6 text-slate-700">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSeeContent}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          See content
        </button>
        <button
          type="button"
          onClick={onTakeQuiz}
          disabled={isQuizPending}
          className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-progress disabled:bg-slate-400"
        >
          {isQuizPending ? "Generating quiz..." : "Take a quiz"}
        </button>
      </div>
    </section>
  );
}
