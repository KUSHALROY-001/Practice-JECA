import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SingleSelect from "./Components/SingleSelect";
import TopicSelector from "./Components/TopicSelector";
import ExamCard from "./Components/ExamCard";
import SubmitButton from "./Components/SubmitButton";
import ModeToggle from "./Components/ModeToggle";
import {
  FileText,
  Target,
  ChevronRight,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  getPYQMeta,
  getMockMeta,
  fetchPYQByTopic,
  fetchMockByTopic,
} from "../../data";
import { QuestionPatternSection } from "../../components/QuestionPatternSection";
import { SyllabusSection } from "../../components/SyllabusSection";
import { ExamZoneSection } from "../../components/ExamZoneSection";
import { FAQSection } from "../../components/FAQSection";
import { Footer } from "../../components/Footer";

// --- Main Component ---
const Home = () => {
  const navigate = useNavigate();

  // PYQ State
  const [pyqMode, setPyqMode] = useState("year"); // "year" or "topic"
  const [pyqYear, setPyqYear] = useState("");
  const [pyqTopic, setPyqTopic] = useState("");
  const [pyqPart, setPyqPart] = useState(1);

  // Mock State
  const [mockMode, setMockMode] = useState("paper"); // "paper" or "topic"
  const [mockPaper, setMockPaper] = useState("");
  const [mockTopic, setMockTopic] = useState("");
  const [mockPart, setMockPart] = useState(1);

  // Options State
  const [pyqYears, setPyqYears] = useState([]);
  const [pyqTopics, setPyqTopics] = useState([]);
  const [mockPapers, setMockPapers] = useState([]);
  const [mockTopics, setMockTopics] = useState([]);

  // Part state calculation
  const [pyqAvailableParts, setPyqAvailableParts] = useState([1]);
  const [isPyqPartsLoading, setIsPyqPartsLoading] = useState(false);
  const [mockAvailableParts, setMockAvailableParts] = useState([1]);
  const [isMockPartsLoading, setIsMockPartsLoading] = useState(false);

  useEffect(() => {
    // PYQ Meta
    const { years: nextPyqYears, topics: nextPyqTopics } = getPYQMeta();
    if (nextPyqYears.length > 0) {
      setPyqYears(nextPyqYears);
      setPyqYear(nextPyqYears[0]);
    }
    if (nextPyqTopics.length > 0) {
      setPyqTopics(nextPyqTopics);
      setPyqTopic(nextPyqTopics[0]);
    }

    // Mock Meta
    const { papers: nextMockPapers, topics: nextMockTopics } = getMockMeta();
    if (nextMockPapers.length > 0) {
      setMockPapers(nextMockPapers);
      setMockPaper(nextMockPapers[0]);
    }
    if (nextMockTopics.length > 0) {
      setMockTopics(nextMockTopics);
      setMockTopic(nextMockTopics[0]);
    }
  }, []);

  const handleStartPYQ = (e) => {
    e.preventDefault();
    if (pyqMode === "year" && pyqYear) {
      navigate(`/exam?type=pyq&year=${pyqYear}`);
    } else if (pyqMode === "topic" && pyqTopic) {
      navigate(`/exam?type=pyq&topic=${pyqTopic}&part=${pyqPart}`);
    }
  };

  const handleStartMock = (e) => {
    e.preventDefault();
    if (mockMode === "paper" && mockPaper) {
      navigate(`/exam?type=mock&paper=${mockPaper}`);
    } else if (mockMode === "topic" && mockTopic) {
      navigate(`/exam?type=mock&topic=${mockTopic}&part=${mockPart}`);
    }
  };

  useEffect(() => {
    if (pyqMode === "topic" && pyqTopic) {
      let isMounted = true;
      setIsPyqPartsLoading(true);
      fetchPYQByTopic(pyqTopic).then((data) => {
        if (!isMounted) return;
        const total = data.length;
        if (total === 0) setPyqAvailableParts([1]);
        else {
          const parts = Math.ceil(total / 30);
          setPyqAvailableParts(Array.from({ length: parts }, (_, i) => i + 1));
        }
        setPyqPart(1);
        setIsPyqPartsLoading(false);
      });
      return () => {
        isMounted = false;
      };
    }
  }, [pyqMode, pyqTopic]);

  useEffect(() => {
    if (mockMode === "topic" && mockTopic) {
      let isMounted = true;
      setIsMockPartsLoading(true);
      fetchMockByTopic(mockTopic).then((data) => {
        if (!isMounted) return;
        const total = data.length;
        if (total === 0) setMockAvailableParts([1]);
        else {
          const parts = Math.ceil(total / 30);
          setMockAvailableParts(Array.from({ length: parts }, (_, i) => i + 1));
        }
        setMockPart(1);
        setIsMockPartsLoading(false);
      });
      return () => {
        isMounted = false;
      };
    }
  }, [mockMode, mockTopic]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 px-3 pb-12 pt-0 md:px-10 md:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.82))]" />
      <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-amber-300/10 blur-[100px]" />

      {/* Inner Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 md:pt-10">
        <div className="relative mb-10 grid">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
              <Sparkles size={16} />
              Smart Practice Session
            </div>
            <h1 className="max-w-3xl text-2xl font-black tracking-tight text-white md:text-4xl">
              Master JECA with previous-year papers, topic-wise practice, and
              real exam simulation.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Attempt full-length year papers with a 120-minute timer, or drill
              into specific subjects to strengthen weak areas — all in one
              focused platform.
            </p>
          </div>
        </div>

        <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-2">
          {/* PYQ Card */}
          <ExamCard
            icon={FileText}
            title="Practice PYQ"
            description="Solve Previous Year Questions."
            variant="cyan"
          >
            <form
              onSubmit={handleStartPYQ}
              className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <ModeToggle
                  mode={pyqMode}
                  setMode={setPyqMode}
                  options={[
                    { value: "year", label: "By Year" },
                    { value: "topic", label: "By Topic" },
                  ]}
                  variant="cyan"
                />
                {pyqMode === "year" ? (
                  <SingleSelect
                    label="Select Exam Year"
                    value={pyqYear}
                    onChange={setPyqYear}
                    options={pyqYears}
                    placeholder="Select a year"
                    variant="cyan"
                  />
                ) : (
                  <TopicSelector
                    topicValue={pyqTopic}
                    setTopicValue={setPyqTopic}
                    topics={pyqTopics}
                    partValue={pyqPart}
                    setPartValue={setPyqPart}
                    availableParts={pyqAvailableParts}
                    isPartsLoading={isPyqPartsLoading}
                    variant="cyan"
                  />
                )}
              </div>
              <SubmitButton variant="cyan" label="Start Practice" />
            </form>
          </ExamCard>

          {/* Mock Test Card */}
          <ExamCard
            icon={Target}
            title="Give Mock Test"
            description="Practice with specific mock tests."
            variant="fuchsia"
          >
            <form
              onSubmit={handleStartMock}
              className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <ModeToggle
                  mode={mockMode}
                  setMode={setMockMode}
                  options={[
                    { value: "paper", label: "By Test Paper" },
                    { value: "topic", label: "By Topic" },
                  ]}
                  variant="fuchsia"
                />
                {mockMode === "paper" ? (
                  <SingleSelect
                    label="Select Mock Test"
                    value={mockPaper}
                    onChange={setMockPaper}
                    options={mockPapers}
                    placeholder="Select a test"
                    variant="fuchsia"
                  />
                ) : (
                  <TopicSelector
                    topicValue={mockTopic}
                    setTopicValue={setMockTopic}
                    topics={mockTopics}
                    partValue={mockPart}
                    setPartValue={setMockPart}
                    availableParts={mockAvailableParts}
                    isPartsLoading={isMockPartsLoading}
                    variant="fuchsia"
                  />
                )}
              </div>
              <SubmitButton variant="fuchsia" label="Start Practice" />
            </form>
          </ExamCard>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center text-slate-500">
          <span className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            Scroll to Explore
          </span>
          <ChevronDown className="animate-bounce text-cyan-400" size={24} />
        </div>

        <QuestionPatternSection />

        {/* Syllabus & Hot Topics */}
        <SyllabusSection />

        {/* Exam Zones */}
        <ExamZoneSection />

        {/* FAQ - About Project */}
        <FAQSection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;
