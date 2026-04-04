import { useState } from "react";
import { ChevronRight } from "lucide-react";

const faqs = [
  {
    question: "What is Practice JECA?",
    answer:
      "Practice JECA is an advanced, specialized platform designed to help students prepare for the West Bengal Joint Entrance Exam for Computer Application (WB JECA) using real previous year papers and high-quality mock tests.",
  },
  {
    question: "Why should I use this platform?",
    answer:
      "It offers an ad-free, sleek, and highly optimized exam simulation environment. You can take timed full-length tests to improve your time management, or drill down into specific subjects part-by-part to master your weak areas.",
  },
  {
    question: "When is the best time to start practicing?",
    answer:
      "As early as possible! Regular practice using our Topic-wise modules helps build a strong foundation, while the Full-Year PYQs are perfect for final stage exam-readiness.",
  },
  {
    question: "How do the Mock tests differ from PYQs?",
    answer:
      "PYQs (Previous Year Questions) are the actual papers from past exams. Mock tests are uniquely curated questions that follow the exact pattern and syllabus of the current JECA format to provide fresh practice material.",
  },
  {
    question: "Is it entirely free to use?",
    answer:
      "Yes! The platform is designed for students, completely free of charge to be accessible to all JECA aspirants.",
  },
  {
    question: "Why I created this project?",
    answer:
      "So in one evening I was working on another project(My attendance System) and one of friends called me to discuss about JECA preparation. Till that time we had some pdf of PYQ and some website gave some mock questions which required login to even access the home page. Then I decided hence I had to build another project, why not this JECA project which gives users an exam simulation of JECA by PYQ & mock without login (I know that 'Login' is a key feature for any application to authenticate users still I decided to move on with the curresnt version but later I can absolutely add this feature which helps users to view their progresses).",
  },
];

const FAQItem = ({ faq, index, openIndices, toggleFAQ }) => {
  const isOpen = openIndices.includes(index);
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-cyan-500/30 mb-2">
      <button
        onClick={() => toggleFAQ(index)}
        className="flex w-full items-center justify-between p-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        <span className="text-[16px] font-semibold text-slate-200 pr-4">
          {faq.question}
        </span>
        <ChevronRight
          className={`text-cyan-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-90" : ""}`}
          size={24}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 text-slate-400 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // Split into two truly independent columns — left: even indices, right: odd indices
  const leftCol = faqs.filter((_, i) => i % 2 === 0);
  const rightCol = faqs.filter((_, i) => i % 2 !== 0);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-black text-white sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-4 text-slate-300">
          Everything you need to know about the project and platform.
        </p>
      </div>

      {/* Two fully independent flex columns — expanding one NEVER affects the other */}
      <div className="flex flex-col md:flex-row md:gap-4 items-start">
        <div className="flex-1 flex flex-col">
          {leftCol.map((faq) => {
            const originalIndex = faqs.indexOf(faq);
            return (
              <FAQItem
                key={originalIndex}
                faq={faq}
                index={originalIndex}
                openIndices={openIndices}
                toggleFAQ={toggleFAQ}
              />
            );
          })}
        </div>
        <div className="flex-1 flex flex-col">
          {rightCol.map((faq) => {
            const originalIndex = faqs.indexOf(faq);
            return (
              <FAQItem
                key={originalIndex}
                faq={faq}
                index={originalIndex}
                openIndices={openIndices}
                toggleFAQ={toggleFAQ}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
