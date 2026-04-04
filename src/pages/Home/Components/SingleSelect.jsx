import { getSelectClass } from './styles';

const SingleSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  variant,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-200">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={getSelectClass(variant)}
      required
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default SingleSelect;
