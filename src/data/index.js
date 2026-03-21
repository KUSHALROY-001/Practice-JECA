import jeca2022 from "./PYQ/2022.json";
import jeca2023 from "./PYQ/2023.json";
import jeca2024 from "./PYQ/2024.json";
import jeca2025 from "./PYQ/2025.json";
import mock1 from "./mock/mock1.json";
import mock2 from "./mock/mock2.json";
import mock3 from "./mock/mock3.json";
import mock4 from "./mock/mock4.json";
import mock5 from "./mock/mock5.json";
import mock6 from "./mock/mock6.json";
import mock7 from "./mock/mock7.json";
import mock8 from "./mock/mock8.json";
import mock9 from "./mock/mock9.json";
import mock10 from "./mock/mock10.json";

export const allPyqQuestions = [
  ...jeca2022,
  ...jeca2023,
  ...jeca2024,
  ...jeca2025,
];

export const allMockQuestions = [
  ...mock1,
  ...mock2,
  ...mock3,
  ...mock4,
  ...mock5,
  ...mock6,
  ...mock7,
  ...mock8,
  ...mock9,
  ...mock10,
];

export const getPYQMeta = () => {
  const years = [
    ...new Set(
      allPyqQuestions.filter((q) => q.year).map((q) => String(q.year)),
    ),
  ].sort((a, b) => b - a);
  const topics = [...new Set(allPyqQuestions.map((q) => q.topic))].sort();
  return { years, topics };
};

export const getMockMeta = () => {
  const papers = [
    ...new Set(
      allMockQuestions.filter((q) => q.mock).map((q) => `Mock ${q.mock}`),
    ),
  ].sort();
  const topics = [...new Set(allMockQuestions.map((q) => q.topic))].sort();
  return { papers, topics };
};

export const getPYQByYear = (year) => {
  return allPyqQuestions.filter((q) => String(q.year) === String(year));
};

export const getPYQByTopic = (topic) => {
  return allPyqQuestions.filter((q) => q.topic === topic);
};

export const getMockByPaper = (paperStr) => {
  const mockNum = String(paperStr).replace("Mock ", "");
  return allMockQuestions.filter((q) => String(q.mock) === String(mockNum));
};

export const getMockByTopic = (topic) => {
  return allMockQuestions.filter((q) => q.topic === topic);
};
