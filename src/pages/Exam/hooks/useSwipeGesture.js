import { useRef } from "react";

const SWIPE_THRESHOLD = 50;

export const useSwipeGesture = ({ questionsLength, setCurrentIndex }) => {
  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;

    if (diff > SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(questionsLength - 1, prev + 1));
    } else if (diff < -SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }
    touchStartX.current = null;
  };

  return { handleTouchStart, handleTouchEnd };
};
