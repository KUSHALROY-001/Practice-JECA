import { useState } from "react";
import { BookOpen, Flame, CheckCircle2 } from "lucide-react";

const syllabusData = [
  {
    id: "c-prog",
    title: "C Programming",
    topics: [
      "Variables and Data types",
      "IO Operations",
      "Operators and Expressions",
      "Control Flow statements",
      "Functions",
      "Array",
      "Pointers",
      "String Handling",
      "Structures and Unions",
      "Files Handling",
      "Pre-Processor Directives",
      "Command Line Arguments",
    ],
    hot: ["Pointers", "Structures and Unions", "Array", "Files Handling"],
  },
  {
    id: "cpp",
    title: "Object-Oriented Programming",
    topics: [
      "Data Types",
      "If / Else If / Else",
      "Loops",
      "Function",
      "Switch case",
      "Pointer",
      "Structure",
      "Array",
      "String",
      "Function Overloading",
      "Function templates",
      "SCOPE of variable",
      "Type aliases (typedef / using)",
      "Unions",
      "Enumerated types (enum)",
      "Class",
      "Constructors",
      "Overloading Constructors",
      "Member initialization in constructors",
      "Pointers to classes",
      "Overloading Operators",
      "Keyword 'this'",
      "Static Members",
      "Const Member Functions",
      "Class Templates",
      "Template Specialization",
      "Namespace",
      "Friendship (Friend Functions & Friend Classes)",
      "Inheritance",
      "Polymorphism",
      "Virtual Members",
      "Abstract base class",
    ],
    hot: ["Polymorphism", "Inheritance", "Virtual Members", "Constructors"],
  },
  {
    id: "unix",
    title: "Unix",
    topics: [
      "Commands: ls, ps, pwd, mv, cp, touch, cat, time, cal, bc, sort, diff, wc, comm, ln, du, kill, sleep, chmod, chown, chgrp, top, nice, renice, cut, paste, grep, file, whereis, which, echo, env, PATH, CLASSPATH, find",
      "vi editor",
      "shell",
      "wildcard",
      "shell script",
    ],
    hot: ["shell script", "grep", "chmod", "vi editor"],
  },
  {
    id: "dsa",
    title: "Data Structure and Algorithms",
    topics: [
      "Searching",
      "Sorting",
      "Stack",
      "Queue",
      "Linked List",
      "Tree",
      "Graph",
    ],
    hot: ["Tree", "Graph", "Linked List", "Sorting"],
  },
  {
    id: "intro",
    title: "Introduction of Computers",
    topics: [
      "Bus structure",
      "Basic I/O",
      "Subroutines",
      "Interrupt",
      "DMA",
      "RAM",
      "ROM",
      "pipeline",
      "system calls",
    ],
    hot: ["DMA", "pipeline", "Interrupt", "system calls"],
  },
  {
    id: "os",
    title: "Operating System",
    topics: [
      "Process",
      "Thread",
      "CPU Scheduling",
      "Deadlock",
      "Synchronization",
      "Memory Management",
      "Disk Management",
      "File Management",
    ],
    hot: ["CPU Scheduling", "Deadlock", "Memory Management", "Synchronization"],
  },
  {
    id: "cn",
    title: "Computer Networks",
    topics: [
      "Concepts of networking",
      "Application areas",
      "Classification",
      "Reference models",
      "Transmission environment & technologies",
      "Routing algorithms",
      "IP, UDP & TCP protocols",
      "IPv4 and IPv6",
      "Reliable data transferring methods",
      "Application protocols",
      "Network Security",
      "Management systems",
      "Perspectives of communication networks",
    ],
    hot: ["IP, UDP & TCP protocols", "Routing algorithms", "Reference models", "IPv4 and IPv6"],
  },
  {
    id: "dbms",
    title: "Database Management System",
    topics: [
      "Introductions to Databases",
      "ER diagram",
      "Relational Algebra",
      "Relational Calculus",
      "SQL",
      "Normalization",
      "Transactions",
      "Indexing",
      "Query optimization",
    ],
    hot: ["Normalization", "SQL", "Transactions", "Relational Algebra"],
  },
  {
    id: "se",
    title: "Software Engineering",
    topics: [
      "Introduction to Software Engineering",
      "A Generic view of process",
      "Process models",
      "Software Requirements",
      "Requirements engineering process",
      "System models",
      "Design Engineering",
      "Testing Strategies",
      "Product metrices",
      "Metrices for Process & Products",
      "Risk management",
      "Quality Management",
    ],
    hot: ["Process models", "Testing Strategies", "Design Engineering", "Risk management"],
  },
  {
    id: "ml",
    title: "Machine Learning",
    topics: [
      "Classification",
      "Decision Tree Learning",
      "Artificial Neural Networks",
      "Support Vector Machines",
      "Bayesian Learning",
      "Clustering",
      "Hidden Markov Models",
    ],
    hot: ["Support Vector Machines", "Artificial Neural Networks", "Clustering", "Hidden Markov Models"],
  },
];

export const SyllabusSection = () => {
  const [activeTab, setActiveTab] = useState(syllabusData[0].id);

  const activeData = syllabusData.find((s) => s.id === activeTab);

  return (
    <div className="mt-16 w-full md:mt-24">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black text-white md:text-4xl">
          Syllabus & Hot Topics
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
          Dive deep into the official JECA curriculum. Focus on high-yield areas
          to maximize your preparation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Tabs Sidebar */}
        <div
          className="flex flex-row gap-2 overflow-x-auto pb-4 lg:col-span-1 lg:flex-col lg:overflow-visible lg:pb-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {syllabusData.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-shrink-0 items-center gap-3 whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 lg:whitespace-normal ${
                activeTab === item.id
                  ? "border border-cyan-400/30 bg-cyan-500/20 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                  : "border border-transparent bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
              }`}
            >
              <BookOpen
                size={16}
                className={`min-w-[16px] ${
                  activeTab === item.id ? "text-cyan-400" : "text-slate-500"
                }`}
              />
              <span className="line-clamp-2">{item.title}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeData && (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-300 md:p-8">
              <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
                <h3 className="text-xl font-black text-white md:text-3xl">
                  {activeData.title}
                </h3>
                <div className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-cyan-400 ring-1 ring-cyan-400/20">
                  JECA Official
                </div>
              </div>

              {/* Hot Topics */}
              <div className="mb-8 p-1">
                <h4 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400">
                  <Flame size={16} className="text-rose-500" /> High-Yield Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeData.hot.map((tag) => (
                    <span
                      key={tag}
                      className="cursor-default rounded-lg border border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-xs font-bold text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.1)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detailed Syllabus */}
              <div>
                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                  Detailed Outline
                </h4>
                <ul className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                  {activeData.topics.map((topic, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 rounded-lg border border-white/5 bg-black/20 p-3 transition duration-300 hover:bg-black/40"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 min-w-[16px] text-cyan-500"
                      />
                      <span className="text-sm font-medium leading-relaxed text-slate-200">
                        {topic}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
