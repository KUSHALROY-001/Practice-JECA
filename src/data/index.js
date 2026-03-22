// Hardcoded metadata ensures the Home page loads instantly without parsing JSONs
export const getPYQMeta = () => {
  return {
    years: ["2025", "2024", "2023", "2022"],
    topics: [
      "C Programming",
      "Computer Networks",
      "Data Structure and Algorithms",
      "Database Management System",
      "Introduction of Computers",
      "Machine Learning",
      "Object-Oriented Programming",
      "Operating System",
      "Software Engineering",
      "Unix",
    ],
  };
};

export const getMockMeta = () => {
  return {
    papers: [
      "Mock 1",
      "Mock 2",
      "Mock 3",
      "Mock 4",
      "Mock 5",
      "Mock 6",
      "Mock 7",
      "Mock 8",
      "Mock 9",
      "Mock 10",
    ],
    topics: [
      "C Programming",
      "Computer Networks",
      "Data Structure and Algorithms",
      "Database Management System",
      "Introduction of Computers",
      "Machine Learning",
      "Object-Oriented Programming",
      "Operating System",
      "Software Engineering",
      "Unix",
    ],
  };
};

// Dynamic Loaders
const loadAllPYQs = async () => {
  const modules = await Promise.all([
    import("./PYQ/2022.json"),
    import("./PYQ/2023.json"),
    import("./PYQ/2024.json"),
    import("./PYQ/2025.json"),
  ]);
  return modules.flatMap((m) => m.default);
};

const loadAllMocks = async () => {
  const modules = await Promise.all([
    import("./mock/mock1.json"),
    import("./mock/mock2.json"),
    import("./mock/mock3.json"),
    import("./mock/mock4.json"),
    import("./mock/mock5.json"),
    import("./mock/mock6.json"),
    import("./mock/mock7.json"),
    import("./mock/mock8.json"),
    import("./mock/mock9.json"),
    import("./mock/mock10.json"),
  ]);
  return modules.flatMap((m) => m.default);
};

export const fetchPYQByYear = async (year) => {
  try {
    const module = await import(`./PYQ/${year}.json`);
    return module.default;
  } catch (err) {
    console.error(`Failed to load PYQ ${year}`, err);
    throw new Error(`Could not load PYQ paper for ${year}`);
  }
};

export const fetchMockByPaper = async (paperStr) => {
  const mockNum = String(paperStr).replace("Mock ", "");
  try {
    const module = await import(`./mock/mock${mockNum}.json`);
    return module.default;
  } catch (err) {
    console.error(`Failed to load Mock ${mockNum}`, err);
    throw new Error(`Could not load Mock paper ${mockNum}`);
  }
};

export const fetchPYQByTopic = async (topic) => {
  const all = await loadAllPYQs();
  return all.filter((q) => q.topic === topic);
};

export const fetchMockByTopic = async (topic) => {
  const all = await loadAllMocks();
  return all.filter((q) => q.topic === topic);
};
