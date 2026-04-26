export type View = "compose" | "summary" | "quiz" | "result";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type ArticleRecord = {
  id: string;
  title: string;
  content: string;
  summary: string;
  quiz: QuizQuestion[];
};

export type ReviewItem = {
  question: QuizQuestion;
  chosenIndex: number | null;
  isCorrect: boolean;
};
