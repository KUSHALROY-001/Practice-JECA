import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, ChevronRight, Sparkles } from "lucide-react";
import { getMeta } from "../data";

const Home = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [topic, setTopic] = useState("");
  const [years, setYears] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const { years: nextYears, topics: nextTopics } = getMeta();
    
    if (nextYears.length > 0) {
      setYears(nextYears);
      setYear((current) => current || nextYears[0]);
    }

    if (nextTopics.length > 0) {
      setTopics(nextTopics);
      setTopic((current) => current || nextTopics[0]);
    }
  }, []);

  const handleStartByYear = (e) => {
    e.preventDefault();
    if (year) navigate(`/exam?year=${year}`);
  };

  const handleStartByTopic = (e) => {
    e.preventDefault();
    if (topic) navigate(`/exam?topic=${topic}`);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-[2rem] border border-white/40 bg-slate-950 px-6 py-8 shadow-[0_30px_120px_rgba(15,23,42,0.35)] md:px-10 md:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.82))]" />
      <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="relative mb-10 grid">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">
            <Sparkles size={16} />
            Smart Practice Session
          </div>
          <h1 className="max-w-3xl text-2xl font-black tracking-tight text-white md:text-4xl">
            Master JECA with previous-year papers, topic-wise practice, and real
            exam simulation.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            Attempt full-length year papers with a 120-minute timer, or drill
            into specific subjects to strengthen weak areas — all in one focused
            platform.
          </p>
        </div>
      </div>


      <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-2">
        <div className="group rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/15">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-2xl bg-cyan-400/15 p-3 text-cyan-200">
              <Calendar size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Exam by Year</h2>
              <p className="text-sm text-slate-300">
                Choose a paper year from the list.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleStartByYear}
            className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Select Exam Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-cyan-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40"
                required
              >
                <option value="" disabled>
                  Select a year
                </option>
                {years.map((optionYear) => (
                  <option key={optionYear} value={optionYear}>
                    {optionYear}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Exam <ChevronRight size={18} />
            </button>
          </form>
        </div>

        <div className="group rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/30 hover:bg-white/15">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-2xl bg-fuchsia-400/15 p-3 text-fuchsia-200">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Exam by Topic</h2>
              <p className="text-sm text-slate-300">
                Practice one subject area at a time.
              </p>
            </div>
          </div>
          <form
            onSubmit={handleStartByTopic}
            className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Select Subject/Topic
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-fuchsia-200/20 bg-slate-900/70 px-4 py-3 text-base font-semibold text-white outline-none transition focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-400/40"
                required
              >
                <option value="" disabled>
                  Select a topic
                </option>
                {topics.map((optionTopic) => (
                  <option key={optionTopic} value={optionTopic}>
                    {optionTopic}
                  </option>
                ))}
              </select>
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
    </div>
  );
};

export default Home;
