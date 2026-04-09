import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPYQMeta,
  getMockMeta,
  fetchPYQByTopic,
  fetchMockByTopic,
} from "../../../data";

const QUESTIONS_PER_PART = 30;

const loadAvailableParts = (fetchFn, topic, setLoading, setPart, setParts) => {
  let isMounted = true;
  setLoading(true);
  fetchFn(topic).then((data) => {
    if (!isMounted) return;
    const total = data.length;
    const parts = total === 0 ? [1] : Array.from({ length: Math.ceil(total / QUESTIONS_PER_PART) }, (_, i) => i + 1);
    setParts(parts);
    setPart(1);
    setLoading(false);
  });
  return () => { isMounted = false; };
};

export const useHomeState = () => {
  const navigate = useNavigate();

  // PYQ State
  const [pyqMode, setPyqMode] = useState("year");
  const [pyqYear, setPyqYear] = useState("");
  const [pyqTopic, setPyqTopic] = useState("");
  const [pyqPart, setPyqPart] = useState(1);
  const [pyqYears, setPyqYears] = useState([]);
  const [pyqTopics, setPyqTopics] = useState([]);
  const [pyqAvailableParts, setPyqAvailableParts] = useState([1]);
  const [isPyqPartsLoading, setIsPyqPartsLoading] = useState(false);

  // Mock State
  const [mockMode, setMockMode] = useState("paper");
  const [mockPaper, setMockPaper] = useState("");
  const [mockTopic, setMockTopic] = useState("");
  const [mockPart, setMockPart] = useState(1);
  const [mockPapers, setMockPapers] = useState([]);
  const [mockTopics, setMockTopics] = useState([]);
  const [mockAvailableParts, setMockAvailableParts] = useState([1]);
  const [isMockPartsLoading, setIsMockPartsLoading] = useState(false);

  // Initialize options from metadata
  useEffect(() => {
    const { years, topics: pTopics } = getPYQMeta();
    if (years.length > 0) { setPyqYears(years); setPyqYear(years[0]); }
    if (pTopics.length > 0) { setPyqTopics(pTopics); setPyqTopic(pTopics[0]); }

    const { papers, topics: mTopics } = getMockMeta();
    if (papers.length > 0) { setMockPapers(papers); setMockPaper(papers[0]); }
    if (mTopics.length > 0) { setMockTopics(mTopics); setMockTopic(mTopics[0]); }
  }, []);

  // Load PYQ parts when topic changes
  useEffect(() => {
    if (pyqMode === "topic" && pyqTopic) {
      return loadAvailableParts(fetchPYQByTopic, pyqTopic, setIsPyqPartsLoading, setPyqPart, setPyqAvailableParts);
    }
  }, [pyqMode, pyqTopic]);

  // Load Mock parts when topic changes
  useEffect(() => {
    if (mockMode === "topic" && mockTopic) {
      return loadAvailableParts(fetchMockByTopic, mockTopic, setIsMockPartsLoading, setMockPart, setMockAvailableParts);
    }
  }, [mockMode, mockTopic]);

  const handleStartPYQ = (e) => {
    e.preventDefault();
    if (pyqMode === "year" && pyqYear) navigate(`/exam?type=pyq&year=${pyqYear}`);
    else if (pyqMode === "topic" && pyqTopic) navigate(`/exam?type=pyq&topic=${pyqTopic}&part=${pyqPart}`);
  };

  const handleStartMock = (e) => {
    e.preventDefault();
    if (mockMode === "paper" && mockPaper) navigate(`/exam?type=mock&paper=${mockPaper}`);
    else if (mockMode === "topic" && mockTopic) navigate(`/exam?type=mock&topic=${mockTopic}&part=${mockPart}`);
  };

  return {
    pyqMode, setPyqMode, pyqYear, setPyqYear, pyqTopic, setPyqTopic,
    pyqPart, setPyqPart, pyqYears, pyqTopics, pyqAvailableParts, isPyqPartsLoading,
    mockMode, setMockMode, mockPaper, setMockPaper, mockTopic, setMockTopic,
    mockPart, setMockPart, mockPapers, mockTopics, mockAvailableParts, isMockPartsLoading,
    handleStartPYQ, handleStartMock,
  };
};
