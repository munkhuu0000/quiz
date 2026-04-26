type CancelQuizModalProps = {
  onGoBack: () => void;
  onCancelQuiz: () => void;
};

export function CancelQuizModal({
  onGoBack,
  onCancelQuiz,
}: CancelQuizModalProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/18 p-4 backdrop-blur-[1px]">
      <div className="w-full max-w-90 rounded-[28px] border border-white/70 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">
          Are you sure?
        </h3>
        <p className="mt-2 text-sm leading-6 text-rose-500">
          If you press &quot;Cancel&quot;, this quiz will restart from the
          beginning.
        </p>
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={onGoBack}
            className="flex-1 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Return to quiz
          </button>
          <button
            type="button"
            onClick={onCancelQuiz}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Cancel quiz
          </button>
        </div>
      </div>
    </div>
  );
}
