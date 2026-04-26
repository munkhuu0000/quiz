import type { ReactNode } from "react";
import { Login } from "../Login";
import { HistorySidebar } from "./HistorySidebar";
import { SidebarIcon } from "./icons";
import type { ArticleRecord } from "./types";

type WorkbenchScaffoldProps = {
  isLocked: boolean;
  isSidebarOpen: boolean;
  items: ArticleRecord[];
  selectedArticleId: string | null;
  onToggleSidebar: () => void;
  onSelectHistory: (articleId: string) => void;
  mobileSidebar: ReactNode;
  children: ReactNode;
};

export function WorkbenchScaffold({
  isLocked,
  isSidebarOpen,
  items,
  selectedArticleId,
  onToggleSidebar,
  onSelectHistory,
  mobileSidebar,
  children,
}: WorkbenchScaffoldProps) {
  return (
    <div
      className={`transition duration-500 ${isLocked ? "pointer-events-none blur-[6px] saturate-75" : ""}`}
    >
      <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-slate-200/70 px-4 py-3 sm:px-6">
          <p className="text-sm font-semibold tracking-tight text-slate-900">
            Quiz app
          </p>
          <Login />
        </div>

        <div className="relative flex min-h-180 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)]">
          <div className="flex w-12 shrink-0 justify-center border-r border-slate-100 bg-slate-50/80 py-5">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
              aria-label="Toggle history"
            >
              <SidebarIcon />
            </button>
          </div>

          <aside
            className={`hidden border-r border-slate-100 bg-white/90 transition-all duration-300 md:block ${
              isSidebarOpen ? "w-58.75" : "w-0 overflow-hidden border-r-0"
            }`}
          >
            <HistorySidebar
              items={items}
              selectedArticleId={selectedArticleId}
              onSelect={onSelectHistory}
            />
          </aside>

          {isSidebarOpen ? (
            <div className="absolute inset-y-0 left-12 z-20 w-61.25 border-r border-slate-100 bg-white/95 md:hidden">
              {mobileSidebar}
            </div>
          ) : null}

          <main className="relative flex-1 px-4 py-10 sm:px-6 lg:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
