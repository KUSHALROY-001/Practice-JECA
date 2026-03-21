import { Clock, Layers, Target, Scale, Hash, Star, AlertTriangle, CheckCircle } from "lucide-react";

export const QuestionPatternSection = () => {
  return (
    <div className="mt-16 w-full md:mt-24">
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black text-white md:text-4xl">JECA Examination Pattern</h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
          Understand the structure of the exam to strategize your time and maximize your score effectively.
        </p>
      </div>

      {/* Main Stats Row */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        <StatCard icon={<Hash size={24} />} title="Questions" value="100" />
        <StatCard icon={<Star size={24} />} title="Total Marks" value="120" />
        <StatCard icon={<Clock size={24} />} title="Duration" value="120 Mins" />
        <StatCard icon={<Layers size={24} />} title="Categories" value="Two" />
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CategoryCard
          title="Category 1"
          qns="80 Questions (Q1 - Q80)"
          marks="1 Mark per Question"
          negative="-¼ Mark for wrong answer"
          format="Single Correct Option"
          icon={<Target size={28} />}
          accent="cyan"
          marksIcon={<Star size={18} />}
          negativeIcon={<AlertTriangle size={18} />}
          formatIcon={<CheckCircle size={18} />}
        />
        <CategoryCard
          title="Category 2"
          qns="20 Questions (Q81 - Q100)"
          marks="2 Marks per Question"
          negative="No Negative Marking"
          format="Multiple Correct Options"
          icon={<Scale size={28} />}
          accent="fuchsia"
          marksIcon={<Star size={18} />}
          negativeIcon={<AlertTriangle size={18} />}
          formatIcon={<Layers size={18} />}
        />
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="group flex flex-col items-center justify-center rounded-[1.25rem] border border-white/5 bg-slate-900/40 p-5 text-center backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/10 hover:bg-slate-800/50">
    <div className="mb-3 text-cyan-400 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <div className="mb-1 text-2xl font-black text-white md:text-3xl">{value}</div>
    <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{title}</div>
  </div>
);

const CategoryCard = ({ title, qns, marks, negative, format, icon, accent, marksIcon, negativeIcon, formatIcon }) => {
  const isCyan = accent === "cyan";
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/10">
      {/* Decorative background glow */}
      <div
        className={`absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[80px] transition duration-500 group-hover:scale-150 group-hover:opacity-70 ${
          isCyan ? "bg-cyan-500/20" : "bg-fuchsia-500/20"
        }`}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-4">
          <div
            className={`rounded-2xl p-4 transition duration-300 ${
              isCyan
                ? "bg-cyan-400/10 text-cyan-300 group-hover:bg-cyan-400/20"
                : "bg-fuchsia-400/10 text-fuchsia-300 group-hover:bg-fuchsia-400/20"
            }`}
          >
            {icon}
          </div>
          <div>
            <h3 className="text-2xl font-black text-white">{title}</h3>
            <p className={`text-sm font-semibold tracking-wide ${isCyan ? "text-cyan-200" : "text-fuchsia-200"}`}>
              {qns}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-4 transition hover:bg-black/40">
            <div className="text-emerald-400">{marksIcon}</div>
            <div className="text-sm font-semibold text-slate-200">{marks}</div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-4 transition hover:bg-black/40">
            <div className="text-rose-400">{negativeIcon}</div>
            <div className="text-sm font-semibold text-slate-200">{negative}</div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 p-4 transition hover:bg-black/40">
            <div className="text-amber-400">{formatIcon}</div>
            <div className="text-sm font-semibold text-slate-200">{format}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
