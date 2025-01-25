export interface Quiz {
  question: string;
  complexity: number;
  questionAnswers: {
    answer: string;
    score: number;
  }[];
}
