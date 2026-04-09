import { Sparkles } from "lucide-react";

const HeroSection = () => (
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
        Attempt full-length year papers with a 120-minute timer, or drill into
        specific subjects to strengthen weak areas — all in one focused
        platform.
      </p>
    </div>
  </div>
);

export default HeroSection;
