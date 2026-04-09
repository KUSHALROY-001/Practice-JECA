import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Layers3,
  Hash,
} from "lucide-react";
import AnswerOption from "./AnswerOption";

const QuestionText = ({ index, text }) => {
  const newlineIndex = text.indexOf("\n");
  const hasCode = newlineIndex !== -1;
  const prose = hasCode ? text.slice(0, newlineIndex) : text;
  const code = hasCode ? text.slice(newlineIndex + 1) : null;

  return (
    <div>
      <h3 className="text-base md:text-xl font-semibold text-slate-800 mb-2 leading-relaxed">
        <span className="text-indigo-600 mr-2">Q{index}.</span>
        {prose}
      </h3>
      {code && (
        <pre className="bg-slate-900 text-green-300 rounded-2xl px-5 py-4 text-sm font-mono leading-relaxed overflow-x-auto border border-slate-700 whitespace-pre-wrap">
          {code}
        </pre>
      )}
    </div>
  );
};

const QuestionMeta = ({ isFullExam, question }) => {
  if (isFullExam) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
        <Layers3 size={16} /> {question.topic}
      </div>
    );
  }
  return (
    <>
      {question.year && (
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          <Layers3 size={16} /> Year: {question.year}
        </div>
      )}
      {question.mock && (
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700">
          <Layers3 size={16} /> Mock: {question.mock}
        </div>
      )}
      <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
        <Hash size={16} /> Original Q. No. {question.questionNo}
      </div>
    </>
  );
};

const isMultiSelect = (q) => q.questionNo >= 81 && q.questionNo <= 100;

const QuestionCard = ({
  question,
  questionIndex,
  totalQuestions,
  answers,
  setAnswers,
  isFullExam,
  handleTouchStart,
  handleTouchEnd,
  onPrev,
  onNext,
  onSubmit,
}) => {
  const isMulti = isMultiSelect(question);
  const currentAnswer = answers[questionIndex];
  const isLast = questionIndex === totalQuestions - 1;

  const handleOptionClick = (idx) => {
    if (isMulti) {
      const prev = Array.isArray(currentAnswer) ? currentAnswer : [];
      const next = prev.includes(idx)
        ? prev.filter((i) => i !== idx)
        : [...prev, idx];
      setAnswers((a) => ({ ...a, [questionIndex]: next }));
    } else {
      setAnswers((a) => ({ ...a, [questionIndex]: idx }));
    }
  };

  const isSelected = (idx) =>
    isMulti
      ? Array.isArray(currentAnswer) && currentAnswer.includes(idx)
      : currentAnswer === idx;

  return (
    <div
      key={questionIndex}
      className="animate-slide-in bg-white/80 backdrop-blur-md p-4 rounded-3xl shadow-md border border-slate-100 mb-6 min-h-[400px] flex flex-col touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Meta badges */}
      <div className="mb-3 flex flex-wrap gap-2">
        <QuestionMeta isFullExam={isFullExam} question={question} />
      </div>

      {/* Question text */}
      <div className="mb-4">
        <QuestionText index={questionIndex + 1} text={question.text} />
      </div>

      {/* Multi-select badge */}
      {isMulti && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-700 tracking-wide">
          ✦ Select all that apply
        </div>
      )}

      {/* Options */}
      <div className="space-y-4 flex-grow">
        {question.options.map((option, idx) => (
          <AnswerOption
            key={idx}
            idx={idx}
            option={option}
            isMulti={isMulti}
            isSelected={isSelected(idx)}
            onClick={() => handleOptionClick(idx)}
          />
        ))}
      </div>

      {/* Prev / Next / Submit */}
      <div className="flex justify-between mt-6 pt-6 border-t border-slate-100">
        <button
          onClick={onPrev}
          disabled={questionIndex === 0}
          title="Shortcut: Left Arrow (←)"
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={20} /> Previous
        </button>

        {isLast ? (
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all"
          >
            <CheckCircle2 size={20} /> Submit Exam
          </button>
        ) : (
          <button
            onClick={onNext}
            title="Shortcut: Right Arrow (→)"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
          >
            Next <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
