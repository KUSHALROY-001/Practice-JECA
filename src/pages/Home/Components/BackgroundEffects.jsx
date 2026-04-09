const BackgroundEffects = () => (
  <>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(251,191,36,0.18),_transparent_28%),linear-gradient(135deg,_rgba(15,23,42,0.92),_rgba(30,41,59,0.82))]" />
    <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[100px]" />
    <div className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-amber-300/10 blur-[100px]" />
  </>
);

export default BackgroundEffects;
