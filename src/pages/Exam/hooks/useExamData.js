import { useEffect, useState, useRef } from "react";
import {
  fetchPYQByYear,
  fetchPYQByTopic,
  fetchMockByPaper,
  fetchMockByTopic,
} from "../../../data";

const QUESTIONS_PER_PART = 30;

export const useExamData = ({ type, year, paper, topic, part }) => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");

    const loadData = async () => {
      try {
        let data = [];
        if (type === "pyq") {
          if (year) data = await fetchPYQByYear(year);
          else if (topic) data = await fetchPYQByTopic(topic);
        } else if (type === "mock") {
          if (paper) data = await fetchMockByPaper(paper);
          else if (topic) data = await fetchMockByTopic(topic);
        } else {
          throw new Error("No valid exam criteria provided.");
        }

        if (!isMounted) return;

        if (data.length === 0) {
          setError("No questions found for this criteria.");
          return;
        }

        const sorted = [...data].sort((a, b) => a.questionNo - b.questionNo);
        let finalData = sorted;

        if (topic && part) {
          const partNum = parseInt(part, 10) || 1;
          const start = (partNum - 1) * QUESTIONS_PER_PART;
          finalData = sorted.slice(start, start + QUESTIONS_PER_PART);

          if (finalData.length === 0) {
            setError(
              `Part ${partNum} does not exist for this topic (Total: ${sorted.length} questions).`,
            );
            setIsLoading(false);
            return;
          }
        }

        setQuestions(finalData);
        hasSubmittedRef.current = false;
      } catch (err) {
        if (!isMounted) return;
        setError(err.message || "Error loading questions from network");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();
    return () => {
      isMounted = false;
    };
  }, [type, year, paper, topic, part]);

  return { questions, isLoading, error, hasSubmittedRef };
};
