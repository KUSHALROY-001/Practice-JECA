import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Trophy, ArrowLeft, Target } from "lucide-react";

const QuestionTextReview = ({ index, text }) => {
  const newlineIndex = text.indexOf("\n");
  const hasCode = newlineIndex !== -1;
  const prose = hasCode ? text.slice(0, newlineIndex) : text;
  const code = hasCode ? text.slice(newlineIndex + 1) : null;
  return (
    <div className="mb-4">
      <h4 className="text-lg font-semibold text-slate-800 bg-white/50 inline-block px-3 py-1 rounded-lg">
        Q{index}. {prose}
      </h4>
      {code && (
        <pre className="mt-2 bg-slate-900 text-green-300 rounded-xl px-4 py-3 text-sm font-mono leading-relaxed overflow-x-auto border border-slate-700 whitespace-pre-wrap">
          {code}
        </pre>
      )}
    </div>
  );
};

// Returns the correct indices always as an array
const getCorrectIndices = (q) =>
  Array.isArray(q.correctOptionIndex)
    ? q.correctOptionIndex
    : [q.correctOptionIndex];

// Returns the selected indices always as an array
const getSelectedIndices = (answer) => {
  if (answer === undefined || answer === null) return null;
  return Array.isArray(answer) ? answer : [answer];
};

// A multi-select answer is correct only when every correct index is selected and nothing extra
const isAnswerCorrect = (q, answer) => {
  const correct = getCorrectIndices(q);
  const selected = getSelectedIndices(answer);
  if (!selected) return false;
  if (selected.length !== correct.length) return false;
  return correct.every((i) => selected.includes(i));
};

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <Navigate to="/" />;
  }

  const { questions, answers, type, year, paper, topic } = state;

  let score = 0;
  let correctCount = 0;
  let wrongCount = 0;
  let unattemptedCount = 0;
  let negativeMarks = 0;

  questions.forEach((q, idx) => {
    const answer = answers[idx];
    const selected = getSelectedIndices(answer);
    if (!selected) {
      unattemptedCount++;
    } else if (isAnswerCorrect(q, answer)) {
      correctCount++;
    } else {
      wrongCount++;
      negativeMarks += 0.25;
    }
  });

  score = correctCount - negativeMarks;

  const percentage = Math.round((correctCount / questions.length) * 100) || 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-lg shadow-indigo-100/50 border border-white/60 text-center">
        <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl shadow-indigo-200 mb-6">
          <Trophy size={48} className="text-white" />
        </div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-indigo-900 mb-2">
          Exam Completed!
        </h1>
        <p className="text-slate-500 text-lg font-medium">
          {type === "pyq"
            ? year
              ? `JECA PYQ Year ${year}`
              : `PYQ Topic: ${topic}`
            : paper
              ? `Mock Test: ${paper}`
              : `Mock Topic: ${topic}`}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          <div className="p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">
              Score
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">
              {score % 1 === 0 ? score : score.toFixed(2)}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-green-50 rounded-2xl border border-green-100">
            <div className="text-xs sm:text-sm font-bold text-green-600/70 uppercase tracking-widest mb-1 truncate">
              Correct
            </div>
            <div className="text-2xl sm:text-3xl font-black text-green-600">
              {correctCount}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-red-50 rounded-2xl border border-red-100">
            <div className="text-xs sm:text-sm font-bold text-red-600/70 uppercase tracking-widest mb-1 truncate">
              Wrong
            </div>
            <div className="text-2xl sm:text-3xl font-black text-red-600">
              {wrongCount}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-rose-50 rounded-2xl border border-rose-200">
            <div className="text-xs sm:text-sm font-bold text-rose-500/80 uppercase tracking-widest mb-1 truncate">
              Negative
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-600">
              -
              {negativeMarks % 1 === 0
                ? negativeMarks
                : negativeMarks.toFixed(2)}
            </div>
          </div>
          <div className="p-4 sm:p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <div className="text-xs sm:text-sm font-bold text-orange-600/70 uppercase tracking-widest mb-1 truncate">
              Unattempted
            </div>
            <div className="text-2xl sm:text-3xl font-black text-orange-600">
              {unattemptedCount}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md shadow-slate-300"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-md py-8 px-3 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Target size={24} className="text-indigo-600" /> Detailed Review
        </h2>

        <div className="space-y-6">
          {questions.map((q, idx) => {
            const answer = answers[idx];
            const correctIndices = getCorrectIndices(q);
            const selectedIndices = getSelectedIndices(answer);
            const isMulti = q.questionNo >= 81 && q.questionNo <= 100;
            const isUnattempted = !selectedIndices;
            const isCorrect = isAnswerCorrect(q, answer);

            return (
              <div
                key={idx}
                className={`p-2 rounded-2xl border-2 transition-colors
                  ${isUnattempted ? "border-slate-200 bg-slate-50" : isCorrect ? "border-green-200 bg-green-50/30" : "border-red-200 bg-red-50/30"}
               `}
              >
                <div className="w-full">
                  {isMulti && (
                    <span className="mb-3 inline-block rounded-full border border-amber-300 bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-700">
                      ✦ Multiple correct answers
                    </span>
                  )}
                  <QuestionTextReview index={idx + 1} text={q.text} />
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisCorrect = correctIndices.includes(optIdx);
                      const isThisSelected =
                        selectedIndices && selectedIndices.includes(optIdx);
                      // Selected but wrong, or missed correct answer
                      const isMissed =
                        isThisCorrect && !isThisSelected && !isUnattempted;

                      let style =
                        "text-slate-600 bg-white border border-slate-200";
                      if (isThisCorrect && isThisSelected) {
                        style =
                          "text-green-800 bg-green-100 border-green-300 font-medium";
                      } else if (isThisCorrect && !isThisSelected) {
                        style =
                          "text-green-700 bg-green-50 border-green-200 font-medium opacity-80";
                      } else if (!isThisCorrect && isThisSelected) {
                        style =
                          "text-red-800 bg-red-100 border-red-300 line-through opacity-70";
                      }

                      const indicatorShape = isMulti
                        ? "rounded-md"
                        : "rounded-full";

                      return (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-xl flex items-center gap-3 ${style}`}
                        >
                          <div
                            className={`w-4 h-4 ${indicatorShape} border flex items-center justify-center flex-shrink-0
                                      ${isThisCorrect ? "border-green-600" : isThisSelected ? "border-red-600" : "border-slate-300"}
                                   `}
                          >
                            {isThisCorrect && isThisSelected && (
                              <div className="w-2 h-2 bg-green-600 rounded-sm" />
                            )}
                            {isThisCorrect && !isThisSelected && (
                              <div className="w-2 h-2 bg-green-400 rounded-sm" />
                            )}
                            {!isThisCorrect && isThisSelected && (
                              <div className="w-2 h-2 bg-red-600 rounded-sm" />
                            )}
                          </div>
                          <span className="flex-grow">{opt}</span>
                          {isMissed && (
                            <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                              missed
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Result;
