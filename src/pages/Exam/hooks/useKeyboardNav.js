import { useEffect } from "react";

export const useKeyboardNav = ({
  isLoading,
  error,
  questionsLength,
  setCurrentIndex,
}) => {
  useEffect(() => {
    if (isLoading || error || questionsLength === 0) return;

    const handleKeyDown = (e) => {
      const tag = document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => Math.min(questionsLength - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLoading, error, questionsLength, setCurrentIndex]);
};
