import { useEffect } from "react";

export const useBackButtonGuard = ({
  isLoading,
  questionsLength,
  hasSubmittedRef,
  onBackPress,
}) => {
  // Intercept browser back button → show our custom cancel dialog
  useEffect(() => {
    if (isLoading || questionsLength === 0 || hasSubmittedRef.current) return;

    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      onBackPress();
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isLoading, questionsLength]);

  // Intercept page reload / tab close → browser's native "Leave site?" prompt
  useEffect(() => {
    if (isLoading || questionsLength === 0 || hasSubmittedRef.current) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      // Modern browsers ignore custom messages but require returnValue to be set
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isLoading, questionsLength]);
};

