import jeca2022 from './2022.json';
import jeca2023 from './2023.json';
import jeca2024 from './2024.json';
import jeca2025 from './2025.json';

const allQuestions = [
  ...jeca2022,
  ...jeca2023,
  ...jeca2024,
  ...jeca2025
];

export const getMeta = () => {
  const years = [...new Set(allQuestions.map(q => String(q.year)))].sort((a, b) => b - a);
  const topics = [...new Set(allQuestions.map(q => q.topic))].sort();
  return { years, topics };
};

export const getQuestionsByYear = (year) => {
  return allQuestions.filter(q => String(q.year) === String(year));
};

export const getQuestionsByTopic = (topic) => {
  return allQuestions.filter(q => q.topic === topic);
};

export default allQuestions;
