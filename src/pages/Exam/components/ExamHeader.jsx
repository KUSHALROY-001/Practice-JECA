import { Clock, CheckCircle2 } from "lucide-react";

const ExamHeader = ({
  type,
  year,
  paper,
  topic,
  part,
  currentIndex,
  questionsLength,
  isFullExam,
  examTimeMinutes,
  timeLeft,
  formatTime,
  onCancel,
  onSubmit,
}) => {
  const title =
    type === "pyq"
      ? year
        ? `PYQ: Year ${year}`
        : `PYQ: ${topic} (Part ${part || 1})`
      : paper
        ? `Mock: ${paper}`
        : `Mock: ${topic} (Part ${part || 1})`;

  const isLowTime = timeLeft < 300;

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <h2 className="text-xl md:text-2xl font-extrabold text-slate-800">
          {title}
        </h2>
        <div className="hidden md:flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">
            Question {currentIndex + 1} of {questionsLength}
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            {isFullExam ? "Full Exam" : "Topic Practice"}
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
            Duration: {examTimeMinutes} min
          </span>
        </div>
      </div>

      <div className="flex flex-col md:items-end gap-3 flex-shrink-0">
        <div
          className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-xl font-bold w-full transition-colors ${
            isLowTime
              ? "border-red-200 bg-red-100 text-red-600"
              : "border-indigo-200 bg-indigo-100 text-indigo-700"
          }`}
        >
          <Clock size={24} className={isLowTime ? "animate-pulse" : ""} />
          {formatTime(timeLeft)}
        </div>
        <div className="flex items-center gap-2 w-full">
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-red-600 border-2 border-red-200 bg-white hover:bg-red-50 hover:border-red-400 transition-all shadow-sm text-sm"
          >
            ✕ Cancel
          </button>
          <button
            onClick={onSubmit}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-white bg-green-600 border-2 border-green-600 hover:bg-green-700 transition-all shadow-sm shadow-green-200 text-sm"
          >
            <CheckCircle2 size={16} /> Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamHeader;
