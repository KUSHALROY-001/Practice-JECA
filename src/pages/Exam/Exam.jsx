import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

// Hooks
import { useExamData } from "./hooks/useExamData";
import { useExamTimer } from "./hooks/useExamTimer";
import { useKeyboardNav } from "./hooks/useKeyboardNav";
import { useBackButtonGuard } from "./hooks/useBackButtonGuard";
import { useSwipeGesture } from "./hooks/useSwipeGesture";

// Components
import CancelWarningDialog from "./components/CancelWarningDialog";
import ExamHeader from "./components/ExamHeader";
import QuestionCard from "./components/QuestionCard";
import QuestionPalette from "./components/QuestionPalette";

const Exam = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get("type");
  const year = searchParams.get("year");
  const paper = searchParams.get("paper");
  const topic = searchParams.get("topic");
  const part = searchParams.get("part");

  const isFullExam = Boolean(year) || Boolean(paper);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showCancelWarning, setShowCancelWarning] = useState(false);

  // --- Data ---
  const { questions, isLoading, error, hasSubmittedRef } = useExamData({
    type,
    year,
    paper,
    topic,
    part,
  });

  // --- Submit ---
  const handleSubmit = () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    navigate("/result", {
      replace: true,
      state: { questions, answers, type, year, paper, topic },
    });
  };

  // --- Timer ---
  const { timeLeft, examTimeMinutes, formatTime } = useExamTimer({
    questions,
    isLoading,
    error,
    onTimeUp: handleSubmit,
  });

  // --- Keyboard nav ---
  useKeyboardNav({
    isLoading,
    error,
    questionsLength: questions.length,
    setCurrentIndex,
  });

  // --- Back button guard ---
  useBackButtonGuard({
    isLoading,
    questionsLength: questions.length,
    hasSubmittedRef,
    onBackPress: () => setShowCancelWarning(true),
  });

  // --- Swipe gestures ---
  const { handleTouchStart, handleTouchEnd } = useSwipeGesture({
    questionsLength: questions.length,
    setCurrentIndex,
  });

  // --- Loading / Error states ---
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-20 p-6 rounded-2xl border border-red-200 bg-red-50 text-xl font-bold text-red-600 shadow-sm text-center">
        {error}
      </div>
    );
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="flex w-full min-h-[50vh] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
        <p className="font-semibold text-slate-500 animate-pulse">
          Loading Your Exam...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showCancelWarning && (
        <CancelWarningDialog
          onKeepGoing={() => setShowCancelWarning(false)}
          onCancel={() => navigate("/", { replace: true })}
        />
      )}

      <ExamHeader
        type={type}
        year={year}
        paper={paper}
        topic={topic}
        part={part}
        currentIndex={currentIndex}
        questionsLength={questions.length}
        isFullExam={isFullExam}
        examTimeMinutes={examTimeMinutes}
        timeLeft={timeLeft}
        formatTime={formatTime}
        onCancel={() => navigate("/")}
        onSubmit={handleSubmit}
      />

      <QuestionCard
        question={questions[currentIndex]}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        answers={answers}
        setAnswers={setAnswers}
        isFullExam={isFullExam}
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
        onPrev={() => setCurrentIndex((p) => Math.max(0, p - 1))}
        onNext={() =>
          setCurrentIndex((p) => Math.min(questions.length - 1, p + 1))
        }
        onSubmit={handleSubmit}
      />

      <QuestionPalette
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default Exam;
