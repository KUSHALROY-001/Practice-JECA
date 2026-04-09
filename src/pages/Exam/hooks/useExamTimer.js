import { useEffect, useRef, useState } from "react";

export const useExamTimer = ({ questions, isLoading, error, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  // Set to true only after timeLeft has ticked down from a positive value.
  // Prevents the startup race: timeLeft===0 on first render should NOT trigger submit.
  const hasBeenPositive = useRef(false);

  // Reset and initialize timer whenever the questions set changes
  useEffect(() => {
    if (questions.length > 0) {
      hasBeenPositive.current = false; // reset for new exam session
      setTimeLeft(Math.round(questions.length * 1.2) * 60);
    }
  }, [questions]);

  // Mark that the clock has been running (timeLeft was > 0 at some point)
  useEffect(() => {
    if (timeLeft > 0) {
      hasBeenPositive.current = true;
    }
  }, [timeLeft]);

  // Countdown tick — only decrements when actively running
  useEffect(() => {
    if (isLoading || error || questions.length === 0 || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isLoading, error, questions.length]);

  // Auto-submit ONLY when the clock ran out (was positive, now zero)
  useEffect(() => {
    if (timeLeft === 0 && hasBeenPositive.current) {
      onTimeUp();
    }
  }, [timeLeft]);

  const examTimeMinutes = questions.length
    ? Math.round(questions.length * 1.2)
    : 0;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return { timeLeft, examTimeMinutes, formatTime };
};
