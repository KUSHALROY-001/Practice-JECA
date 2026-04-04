import { getToggleBtnClass } from './styles';

const ModeToggle = ({ mode, setMode, options, variant }) => (
  <div className="flex gap-4 rounded-xl bg-slate-900/40 p-1 border border-white/5">
    {options.map((opt) => (
      <button
        key={opt.value}
        type="button"
        onClick={() => setMode(opt.value)}
        className={getToggleBtnClass(mode === opt.value, variant)}
      >
        {opt.label}
      </button>
    ))}
  </div>
);

export default ModeToggle;
