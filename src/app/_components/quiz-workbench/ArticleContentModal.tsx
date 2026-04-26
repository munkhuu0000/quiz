import { CloseIcon } from "./icons";
import type { ArticleRecord } from "./types";

type ArticleContentModalProps = {
  article: ArticleRecord;
  onClose: () => void;
};

export function ArticleContentModal({
  article,
  onClose,
}: ArticleContentModalProps) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-slate-950/18 p-4 backdrop-blur-[2px]">
      <div className="max-h-[80vh] w-full max-w-130 overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              {article.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Original article content
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close content"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-5 py-4">
          {article.content.split("\n\n").map((paragraph) => (
            <p
              key={paragraph}
              className="mb-4 text-sm leading-7 text-slate-700 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
