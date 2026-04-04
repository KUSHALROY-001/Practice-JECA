import { cardBaseClass } from './styles';

const ExamCard = ({ icon: Icon, title, description, variant, children }) => {
  const hoverBorderClass =
    variant === "cyan"
      ? "hover:border-cyan-300/30"
      : "hover:border-fuchsia-300/30";
  const iconBgClass =
    variant === "cyan"
      ? "bg-cyan-400/15 text-cyan-200"
      : "bg-fuchsia-400/15 text-fuchsia-200";

  return (
    <div className={`${cardBaseClass} ${hoverBorderClass}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`rounded-2xl p-3 ${iconBgClass}`}>
          <Icon size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-slate-300">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};
export default ExamCard;
