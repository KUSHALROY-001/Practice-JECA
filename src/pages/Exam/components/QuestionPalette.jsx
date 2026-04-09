const QuestionPalette = ({
  questions,
  currentIndex,
  answers,
  setCurrentIndex,
}) => (
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-slate-100">
    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
      Question Palette
    </h4>
    <div className="flex flex-wrap gap-2">
      {questions.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setCurrentIndex(idx)}
          className={`w-10 h-10 rounded-lg font-bold flex items-center justify-center border transition-colors
            ${idx === currentIndex ? "ring-2 ring-offset-2 ring-indigo-500" : ""}
            ${
              answers[idx] !== undefined
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
            }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionPalette;
