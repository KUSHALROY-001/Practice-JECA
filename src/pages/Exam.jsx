import { useEffect, useRef, useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Hash,
} from "lucide-react";
import {
  getPYQByYear,
  getPYQByTopic,
  getMockByPaper,
  getMockByTopic,
} from "../data";


const QuestionText = ({ index, text }) => {
  const newlineIndex = text.indexOf("\n");
  const hasCode = newlineIndex !== -1;
  const questionProse = hasCode ? text.slice(0, newlineIndex) : text;
  const codeBlock = hasCode ? text.slice(newlineIndex + 1) : null;

  return (
    <div>
      <h3 className="text-base md:text-xl font-semibold text-slate-800 mb-2 leading-relaxed">
        <span className="text-indigo-600 mr-2">Q{index}.</span>
        {questionProse}
      </h3>
      {codeBlock && (
        <pre className="bg-slate-900 text-green-300 rounded-2xl px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto border border-slate-700 whitespace-pre-wrap">
          {codeBlock}
        </pre>
      )}
    </div>
  );
};


const Exam = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const year = searchParams.get("year");
  const paper = searchParams.get("paper");
  const topic = searchParams.get("topic");

  const isFullExam = Boolean(year) || Boolean(paper);

  const { data: questions, error } = useMemo(() => {
    try {
      let data = [];
      if (type === "pyq") {
        if (year) data = getPYQByYear(year);
        else if (topic) data = getPYQByTopic(topic);
      } else if (type === "mock") {
        if (paper) data = getMockByPaper(paper);
        else if (topic) data = getMockByTopic(topic);
      } else {
        return { data: [], error: "No valid exam criteria provided." };
      }

      if (data.length === 0) {
        return { data: [], error: "No questions found for this criteria." };
      }

      // Sort questions sequentially by their original question number
      const sorted = [...data].sort((a, b) => a.questionNo - b.questionNo);
      return { data: sorted, error: "" };
    } catch (err) {
      return { data: [], error: err.message || "Error loading questions" };
    }
  }, [type, year, paper, topic]);

  const examTimeMinutes = useMemo(() => {
    return questions ? Math.round(questions.length * 1.2) : 0;
  }, [questions]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(examTimeMinutes * 60);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    setTimeLeft(examTimeMinutes * 60);
    setCurrentIndex(0);
    setAnswers({});
    hasSubmittedRef.current = false;
  }, [examTimeMinutes, type, year, paper, topic]);

  // Timer logic
  useEffect(() => {
    if (error || questions.length === 0) return;
    if (hasSubmittedRef.current) return;

    if (timeLeft <= 0) {
      handleSubmit(); // Auto-submit when timer reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, error, questions]);

  const handleSubmit = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    navigate("/result", {
      state: { questions, answers, type, year, paper, topic },
    });
  };

  const currentQ = questions[currentIndex];

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  if (error)
    return (
      <div className="text-xl font-bold text-red-500 bg-red-50 p-6 rounded-2xl border border-red-200">
        {error}
      </div>
    );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-800">
            {type === "pyq"
              ? year
                ? `PYQ: Year ${year}`
                : `PYQ: ${topic}`
              : paper
                ? `Mock: ${paper}`
                : `Mock: ${topic}`}
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">
              Question {currentIndex + 1} of {questions.length}
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
            className={`flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 text-xl font-bold transition-colors w-full ${timeLeft < 300 ? "border-red-200 bg-red-100 text-red-600" : "border-indigo-200 bg-indigo-100 text-indigo-700"}`}
          >
            <Clock size={24} className={timeLeft < 300 ? "animate-pulse" : ""} />
            {formatTime(timeLeft)}
          </div>
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => navigate("/")}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold text-red-600 border-2 border-red-200 bg-white hover:bg-red-50 hover:border-red-400 transition-all shadow-sm text-sm"
            >
              ✕ Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold text-white bg-green-600 border-2 border-green-600 hover:bg-green-700 transition-all shadow-sm shadow-green-200 text-sm"
            >
              <CheckCircle2 size={16} /> Submit
            </button>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-md border border-slate-100 mb-6 min-h-[400px] flex flex-col">
        <div className="mb-3 flex flex-wrap gap-2">
          {isFullExam ? (
            // Full exam: show topic only
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
              <Layers3 size={16} />
              {currentQ.topic}
            </div>
          ) : (
            // Topic practice: show year/paper + original question number
            <>
              {currentQ.year && (
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  <Layers3 size={16} />
                  Year: {currentQ.year}
                </div>
              )}
              {currentQ.mock && (
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
                  <Layers3 size={16} />
                  Mock Paper: {currentQ.mock}
                </div>
              )}
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
                <Hash size={16} />
                Original Q. No. {currentQ.questionNo}
              </div>
            </>
          )}
        </div>

        <div className="mb-4">
          <QuestionText index={currentIndex + 1} text={currentQ.text} />
        </div>

        {/* Multi-select badge for Q81–100 */}
        {currentQ.questionNo >= 81 && currentQ.questionNo <= 100 && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 tracking-wide">
            ✦ Select all that apply
          </div>
        )}

        <div className="space-y-4 flex-grow">
          {currentQ.options.map((option, idx) => {
            const isMulti =
              currentQ.questionNo >= 81 && currentQ.questionNo <= 100;
            const currentAnswer = answers[currentIndex];

            // Multi-select: answer stored as array of indices
            const isSelected = isMulti
              ? Array.isArray(currentAnswer) && currentAnswer.includes(idx)
              : currentAnswer === idx;

            const handleClick = () => {
              if (isMulti) {
                const prev = Array.isArray(currentAnswer) ? currentAnswer : [];
                const next = prev.includes(idx)
                  ? prev.filter((i) => i !== idx)
                  : [...prev, idx];
                setAnswers({ ...answers, [currentIndex]: next });
              } else {
                setAnswers({ ...answers, [currentIndex]: idx });
              }
            };

            return (
              <button
                key={idx}
                onClick={handleClick}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group
                  ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50 text-indigo-900 shadow-sm"
                      : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700"
                  }`}
              >
                {isMulti ? (
                  /* Checkbox style for multi-select */
                  <div
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? "border-indigo-600 bg-indigo-600" : "border-slate-300 group-hover:border-indigo-400"}`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                ) : (
                  /* Radio style for single-select */
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected ? "border-indigo-600" : "border-slate-300 group-hover:border-indigo-400"}`}
                  >
                    {isSelected && (
                      <div className="w-3 h-3 bg-indigo-600 rounded-full" />
                    )}
                  </div>
                )}
                <span className="text-base md:text-lg font-medium">{option}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
            >
              <CheckCircle2 size={20} /> Submit Exam
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(questions.length - 1, prev + 1),
                )
              }
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Grid of answered questions */}
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
                    }
                 `}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Exam;
