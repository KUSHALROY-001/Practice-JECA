import { getSelectClass } from './styles';

const TopicSelector = ({
  topicValue,
  setTopicValue,
  topics,
  partValue,
  setPartValue,
  availableParts,
  isPartsLoading,
  variant,
}) => (
  <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
    <div className="flex-[3] space-y-2">
      <label className="text-sm font-medium text-slate-200">
        Select Subject{variant === "fuchsia" ? "/Topic" : ""}
      </label>
      <select
        value={topicValue}
        onChange={(e) => setTopicValue(e.target.value)}
        className={getSelectClass(variant)}
        required
      >
        <option value="" disabled>
          Select a topic
        </option>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
    <div className="flex-[1] space-y-2">
      <label
        className="text-sm font-medium text-slate-200 text-ellipsis overflow-hidden whitespace-nowrap"
        title="30 Questions per Part"
      >
        Part #
      </label>
      <select
        value={partValue}
        onChange={(e) => setPartValue(e.target.value)}
        disabled={isPartsLoading}
        className={getSelectClass(variant, true)}
        required
      >
        {isPartsLoading ? (
          <option value="1">...</option>
        ) : (
          availableParts.map((p) => (
            <option key={p} value={p}>
              Part {p}
            </option>
          ))
        )}
      </select>
    </div>
  </div>
);

export default TopicSelector;