import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Target, ChevronRight, Sparkles, ChevronDown } from "lucide-react";
import { getPYQMeta, getMockMeta } from "../data";
import { QuestionPatternSection } from "../components/QuestionPatternSection";
import { SyllabusSection } from "../components/SyllabusSection";
import { ExamZoneSection } from "../components/ExamZoneSection";

const Home = () => {
  const navigate = useNavigate();

  // PYQ State
  const [pyqMode, setPyqMode] = useState("year"); // "year" or "topic"
  const [pyqYear, setPyqYear] = useState("");
  const [pyqTopic, setPyqTopic] = useState("");

  // Mock State
  const [mockMode, setMockMode] = useState("paper"); // "paper" or "topic"
  const [mockPaper, setMockPaper] = useState("");
  const [mockTopic, setMockTopic] = useState("");

  // Options State
  const [pyqYears, setPyqYears] = useState([]);
  const [pyqTopics, setPyqTopics] = useState([]);
  const [mockPapers, setMockPapers] = useState([]);
  const [mockTopics, setMockTopics] = useState([]);

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
      navigate(`/exam?type=pyq&topic=${pyqTopic}`);
    }
  };

  const handleStartMock = (e) => {
    e.preventDefault();
    if (mockMode === "paper" && mockPaper) {
      navigate(`/exam?type=mock&paper=${mockPaper}`);
    } else if (mockMode === "topic" && mockTopic) {
      navigate(`/exam?type=mock&topic=${mockTopic}`);
    }
  };

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
          <div className="group rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
                <FileText size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Practice PYQ</h2>
                <p className="text-sm text-slate-300">
                  Solve Previous Year Questions.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleStartPYQ}
              className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex gap-4 rounded-xl bg-slate-900/40 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setPyqMode("year")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                      pyqMode === "year"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    By Year
                  </button>
                  <button
                    type="button"
                    onClick={() => setPyqMode("topic")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                      pyqMode === "topic"
                        ? "bg-cyan-500/20 text-cyan-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    By Topic
                  </button>
                </div>

                {pyqMode === "year" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Select Exam Year
                    </label>
                    <select
                      value={pyqYear}
                      onChange={(e) => setPyqYear(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-cyan-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40"
                      required
                    >
                      <option value="" disabled>
                        Select a year
                      </option>
                      {pyqYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Select Subject/Topic
                    </label>
                    <select
                      value={pyqTopic}
                      onChange={(e) => setPyqTopic(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-cyan-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40"
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {pyqTopics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Start Practice <ChevronRight size={18} />
              </button>
            </form>
          </div>

          {/* Mock Test Card */}
          <div className="group rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/30 hover:bg-white/15">
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-2xl bg-fuchsia-400/15 p-3 text-fuchsia-200">
                <Target size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Give Mock Test</h2>
                <p className="text-sm text-slate-300">
                  Practice with specific mock tests.
                </p>
              </div>
            </div>
            <form
              onSubmit={handleStartMock}
              className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
            >
              <div className="space-y-4">
                <div className="flex gap-4 rounded-xl bg-slate-900/40 p-1 border border-white/5">
                  <button
                    type="button"
                    onClick={() => setMockMode("paper")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                      mockMode === "paper"
                        ? "bg-fuchsia-500/20 text-fuchsia-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    By Test Paper
                  </button>
                  <button
                    type="button"
                    onClick={() => setMockMode("topic")}
                    className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${
                      mockMode === "topic"
                        ? "bg-fuchsia-500/20 text-fuchsia-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    By Topic
                  </button>
                </div>

                {mockMode === "paper" ? (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Select Mock Test
                    </label>
                    <select
                      value={mockPaper}
                      onChange={(e) => setMockPaper(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-fuchsia-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-400/40"
                      required
                    >
                      <option value="" disabled>
                        Select a test
                      </option>
                      {mockPapers.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-200">
                      Select Subject/Topic
                    </label>
                    <select
                      value={mockTopic}
                      onChange={(e) => setMockTopic(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-fuchsia-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-400/40"
                      required
                    >
                      <option value="" disabled>
                        Select a topic
                      </option>
                      {mockTopics.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-fuchsia-500 px-4 py-3 font-bold text-white transition hover:bg-fuchsia-400"
              >
                Start Practice <ChevronRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex flex-col items-center justify-center text-slate-500">
          <span className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Scroll to Explore</span>
          <ChevronDown className="animate-bounce text-cyan-400" size={24} />
        </div>

        <QuestionPatternSection />

        {/* Syllabus & Hot Topics */}
        <SyllabusSection />

        {/* Exam Zones */}
        <ExamZoneSection />

        {/* Footer */}
        <div className="mt-12 flex justify-center border-t border-white/10 pt-8 pb-4">
          <button 
            onClick={() => navigate('/contact')} 
            className="text-sm font-semibold text-slate-500 transition hover:text-cyan-400"
          >
            Need Help or Found an Error? Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
