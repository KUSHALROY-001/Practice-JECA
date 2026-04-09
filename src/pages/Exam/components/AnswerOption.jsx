const CheckIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const AnswerOption = ({ option, idx, isSelected, isMulti, onClick }) => {
  const selectedClass =
    "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm";
  const defaultClass =
    "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700";

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-2 rounded-xl border-2 transition-all flex items-center gap-2 group ${isSelected ? selectedClass : defaultClass}`}
    >
      {isMulti ? (
        <div
          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected
              ? "border-indigo-600 bg-indigo-600"
              : "border-slate-300 group-hover:border-indigo-400"
          }`}
        >
          {isSelected && <CheckIcon />}
        </div>
      ) : (
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected
              ? "border-indigo-600"
              : "border-slate-300 group-hover:border-indigo-400"
          }`}
        >
          {isSelected && <div className="w-3 h-3 bg-indigo-600 rounded-full" />}
        </div>
      )}
      <span className="text-base md:text-lg font-medium">{option}</span>
    </button>
  );
};

export default AnswerOption;
