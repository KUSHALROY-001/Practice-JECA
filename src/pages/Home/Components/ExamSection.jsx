import { FileText, Target } from "lucide-react";
import ExamCard from "./ExamCard";
import ModeToggle from "./ModeToggle";
import SingleSelect from "./SingleSelect";
import TopicSelector from "./TopicSelector";
import SubmitButton from "./SubmitButton";

/**
 * Renders both PYQ and Mock exam selection cards using a config-driven
 * approach to eliminate duplicated JSX.
 */
const ExamSection = ({ pyq, mock }) => {
  const cards = [
    {
      icon: FileText,
      title: "Practice PYQ",
      description: "Solve Previous Year Questions.",
      variant: "cyan",
      onSubmit: pyq.onSubmit,
      modeProps: {
        mode: pyq.mode,
        setMode: pyq.setMode,
        options: [
          { value: "year", label: "By Year" },
          { value: "topic", label: "By Topic" },
        ],
      },
      singleSelect:
        pyq.mode === "year"
          ? {
              label: "Select Exam Year",
              value: pyq.year,
              onChange: pyq.setYear,
              options: pyq.years,
              placeholder: "Select a year",
            }
          : null,
      topicSelector:
        pyq.mode === "topic"
          ? {
              topicValue: pyq.topic,
              setTopicValue: pyq.setTopic,
              topics: pyq.topics,
              partValue: pyq.part,
              setPartValue: pyq.setPart,
              availableParts: pyq.availableParts,
              isPartsLoading: pyq.isPartsLoading,
            }
          : null,
    },
    {
      icon: Target,
      title: "Give Mock Test",
      description: "Practice with specific mock tests.",
      variant: "fuchsia",
      onSubmit: mock.onSubmit,
      modeProps: {
        mode: mock.mode,
        setMode: mock.setMode,
        options: [
          { value: "paper", label: "By Test Paper" },
          { value: "topic", label: "By Topic" },
        ],
      },
      singleSelect:
        mock.mode === "paper"
          ? {
              label: "Select Mock Test",
              value: mock.paper,
              onChange: mock.setPaper,
              options: mock.papers,
              placeholder: "Select a test",
            }
          : null,
      topicSelector:
        mock.mode === "topic"
          ? {
              topicValue: mock.topic,
              setTopicValue: mock.setTopic,
              topics: mock.topics,
              partValue: mock.part,
              setPartValue: mock.setPart,
              availableParts: mock.availableParts,
              isPartsLoading: mock.isPartsLoading,
            }
          : null,
    },
  ];

  return (
    <div className="relative grid gap-6 grid-cols-1 sm:grid-cols-2">
      {cards.map(({ icon, title, description, variant, onSubmit, modeProps, singleSelect, topicSelector }) => (
        <ExamCard key={variant} icon={icon} title={title} description={description} variant={variant}>
          <form
            onSubmit={onSubmit}
            className="flex h-[calc(100%-88px)] flex-col justify-between gap-5"
          >
            <div className="space-y-4">
              <ModeToggle {...modeProps} variant={variant} />
              {singleSelect && <SingleSelect {...singleSelect} variant={variant} />}
              {topicSelector && <TopicSelector {...topicSelector} variant={variant} />}
            </div>
            <SubmitButton variant={variant} label="Start Practice" />
          </form>
        </ExamCard>
      ))}
    </div>
  );
};

export default ExamSection;
