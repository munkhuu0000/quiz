import { FileTextIcon, SparklesIcon } from "./icons";

type ArticleComposerProps = {
  title: string;
  content: string;
  isPending: boolean;
  isDisabled: boolean;
  onTitleChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onGenerate: () => void;
};

export function ArticleComposer({
  title,
  content,
  isPending,
  isDisabled,
  onTitleChange,
  onContentChange,
  onGenerate,
}: ArticleComposerProps) {
  return (
    <section className="mx-auto max-w-140 rounded-[28px] border border-slate-200/70 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div>
        <div>
          <div className="flex items-center gap-2">
            <SparklesIcon className="text-slate-900" />
            <h2 className="text-lg font-semibold text-slate-950">
              Article Quiz Generator
            </h2>
          </div>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Paste your article below to generate a summarized note and quiz
            questions. Your articles will be saved in the sidebar for future
            reference.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileTextIcon className="text-slate-400" />
            Article Title
          </span>
          <input
            value={title}
            onChange={(event) => onTitleChange(event.target.value)}
            placeholder="Enter a title for your article..."
            className="h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <FileTextIcon className="text-slate-400" />
            Article Content
          </span>
          <textarea
            value={content}
            onChange={(event) => onContentChange(event.target.value)}
            placeholder="Paste your article content here..."
            rows={9}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
          />
        </label>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isDisabled}
          className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
        >
          {isPending ? "Generating..." : "Generate summary"}
        </button>
      </div>
    </section>
  );
}
