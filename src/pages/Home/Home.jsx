import { useHomeState } from "./hooks/useHomeState";
import BackgroundEffects from "./Components/BackgroundEffects";
import HeroSection from "./Components/HeroSection";
import ExamSection from "./Components/ExamSection";
import ScrollIndicator from "./Components/ScrollIndicator";
import { QuestionPatternSection } from "../../components/QuestionPatternSection";
import { SyllabusSection } from "../../components/SyllabusSection";
import { ExamZoneSection } from "../../components/ExamZoneSection";
import { FAQSection } from "../../components/FAQSection";
import { Footer } from "../../components/Footer";

const Home = () => {
  const {
    pyqMode, setPyqMode, pyqYear, setPyqYear, pyqTopic, setPyqTopic,
    pyqPart, setPyqPart, pyqYears, pyqTopics, pyqAvailableParts,
    isPyqPartsLoading, handleStartPYQ,
    mockMode, setMockMode, mockPaper, setMockPaper, mockTopic, setMockTopic,
    mockPart, setMockPart, mockPapers, mockTopics, mockAvailableParts,
    isMockPartsLoading, handleStartMock,
  } = useHomeState();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950 px-3 pb-12 pt-0 md:px-10 md:pb-20">
      <BackgroundEffects />

      <div className="relative z-10 w-full max-w-5xl mx-auto pt-6 md:pt-10">
        <HeroSection />

        <ExamSection
          pyq={{
            onSubmit: handleStartPYQ,
            mode: pyqMode, setMode: setPyqMode,
            year: pyqYear, setYear: setPyqYear,
            topic: pyqTopic, setTopic: setPyqTopic,
            part: pyqPart, setPart: setPyqPart,
            years: pyqYears, topics: pyqTopics,
            availableParts: pyqAvailableParts,
            isPartsLoading: isPyqPartsLoading,
          }}
          mock={{
            onSubmit: handleStartMock,
            mode: mockMode, setMode: setMockMode,
            paper: mockPaper, setPaper: setMockPaper,
            topic: mockTopic, setTopic: setMockTopic,
            part: mockPart, setPart: setMockPart,
            papers: mockPapers, topics: mockTopics,
            availableParts: mockAvailableParts,
            isPartsLoading: isMockPartsLoading,
          }}
        />

        <ScrollIndicator />
        <QuestionPatternSection />
        <SyllabusSection />
        <ExamZoneSection />
        <FAQSection />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
