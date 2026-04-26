import type { ArticleRecord } from "./types";

type HistorySidebarProps = {
  items: ArticleRecord[];
  selectedArticleId: string | null;
  onSelect: (articleId: string) => void;
};

export function HistorySidebar({ items, selectedArticleId, onSelect }: HistorySidebarProps) {
  return (
    <div className="h-full px-4 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">History</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Saved articles</p>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
          {items.length}
        </span>
      </div>

      <div className="mt-5 space-y-1">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-3 py-4">
            <p className="text-sm font-semibold text-slate-700">No saved articles yet</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Save a generated summary and it will appear here.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const isSelected = item.id === selectedArticleId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`w-full rounded-2xl px-3 py-3 text-left transition ${
                  isSelected
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-900/10"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <p className="text-sm font-semibold leading-5">{item.title}</p>
                <p
                  className={`mt-1 line-clamp-2 text-xs leading-5 ${
                    isSelected ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {item.summary}
                </p>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
