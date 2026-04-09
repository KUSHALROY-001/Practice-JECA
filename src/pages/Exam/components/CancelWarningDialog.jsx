const CancelWarningDialog = ({ onKeepGoing, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="mx-4 w-full max-w-sm rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
      <h3 className="mb-2 text-xl font-black text-slate-800">Cancel Exam?</h3>
      <p className="mb-6 text-sm leading-relaxed text-slate-500">
        If you go back now, your progress will be lost and the exam will be
        cancelled.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onKeepGoing}
          className="flex-1 rounded-2xl border-2 border-slate-200 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
        >
          Keep Going
        </button>
        <button
          onClick={onCancel}
          className="flex-1 rounded-2xl bg-red-500 py-3 text-sm font-bold text-white transition hover:bg-red-600"
        >
          Cancel Exam
        </button>
      </div>
    </div>
  </div>
);

export default CancelWarningDialog;
