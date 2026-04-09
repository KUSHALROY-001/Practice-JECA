import { ChevronDown } from "lucide-react";

const ScrollIndicator = () => (
  <div className="mt-12 flex flex-col items-center justify-center text-slate-500">
    <span className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">
      Scroll to Explore
    </span>
    <ChevronDown className="animate-bounce text-cyan-400" size={24} />
  </div>
);

export default ScrollIndicator;
