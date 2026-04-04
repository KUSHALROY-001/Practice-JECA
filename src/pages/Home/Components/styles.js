export const cardBaseClass = "group rounded-[1.75rem] border border-white/10 bg-white/10 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15";

export const inputBaseClass = "w-full appearance-none rounded-2xl border bg-slate-900/70 py-3 text-base font-semibold text-white outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

export const getSelectClass = (variant, center = false) => {
  const alignClass = center ? "px-2 text-center" : "px-4";
  return variant === "cyan" 
    ? `${inputBaseClass} ${alignClass} border-cyan-200/20 focus:border-cyan-300 focus:ring-cyan-400/40`
    : `${inputBaseClass} ${alignClass} border-fuchsia-200/20 focus:border-fuchsia-300 focus:ring-fuchsia-400/40`;
};

export const getToggleBtnClass = (isActive, variant) => {
  const base = "flex-1 rounded-lg py-2 text-sm font-semibold transition";
  if (!isActive) return `${base} text-slate-400 hover:text-slate-200`;
  return variant === "cyan" 
    ? `${base} bg-cyan-500/20 text-cyan-300`
    : `${base} bg-fuchsia-500/20 text-fuchsia-300`;
};
