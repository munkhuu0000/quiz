import { SparklesIcon, StatusCheckIcon, StatusXIcon } from "./icons";
import type { ReviewItem } from "./types";

type ResultCardProps = {
  score: number;
  total: number;
  items: ReviewItem[];
  onRestart: () => void;
  onSaveAndLeave: () => void;
};

export function ResultCard({
  score,
  total,
  items,
  onRestart,
  onSaveAndLeave,
}: ResultCardProps) {
  return (
    <section className="mx-auto mt-8 max-w-117.5 rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)]">
      <div className="flex items-center gap-2">
        <SparklesIcon className="text-slate-900" />
        <h2 className="text-lg font-semibold text-slate-950">Quiz completed</h2>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Let&apos;s see what you did.
      </p>

      <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
        <p className="text-xl font-semibold text-slate-950">
          Your score: {score} / {total}
        </p>
        <div className="mt-4 space-y-3">
          {items.map((item, index) => (
            <div
              key={item.question.id}
              className="rounded-2xl bg-white px-4 py-3 shadow-sm"
            >
              <div className="flex gap-3">
                {item.isCorrect ? (
                  <StatusCheckIcon className="mt-1 shrink-0 text-emerald-500" />
                ) : (
                  <StatusXIcon className="mt-1 shrink-0 text-rose-500" />
                )}
                <div>
                  <p className="text-sm font-semibold leading-6 text-slate-900">
                    {index + 1}. {item.question.prompt}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Your answer:{" "}
                    <span
                      className={
                        item.isCorrect ? "text-emerald-600" : "text-rose-500"
                      }
                    >
                      {item.chosenIndex === null
                        ? "No answer"
                        : item.question.options[item.chosenIndex]}
                    </span>
                  </p>
                  {!item.isCorrect ? (
                    <p className="text-xs leading-5 text-emerald-600">
                      Correct:{" "}
                      {item.question.options[item.question.correctIndex]}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
        >
          Restart quiz
        </button>
        <button
          type="button"
          onClick={onSaveAndLeave}
          className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800"
        >
          Save and leave
        </button>
      </div>
    </section>
  );
}
