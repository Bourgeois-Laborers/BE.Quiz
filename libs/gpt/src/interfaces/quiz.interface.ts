export interface QuizQuestion {
  question: string;
  complexity: number;
  order: number;
  questionAnswers: {
    answer: string;
    score: number;
  }[];
}
