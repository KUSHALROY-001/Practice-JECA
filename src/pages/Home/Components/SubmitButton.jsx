import { ChevronRight } from 'lucide-react';

const SubmitButton = ({ variant, label }) => {
  const btnClass =
    variant === "cyan"
      ? "bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
      : "bg-fuchsia-500 px-4 py-3 font-bold text-white transition hover:bg-fuchsia-400";

  return (
    <button
      type="submit"
      className={`mt-auto flex w-full items-center justify-center gap-2 rounded-2xl ${btnClass}`}
    >
      {label} <ChevronRight size={18} />
    </button>
  );
};

export default SubmitButton;
