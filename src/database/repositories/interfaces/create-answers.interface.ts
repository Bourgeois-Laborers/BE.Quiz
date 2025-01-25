export interface InsertAnswer {
  questionId: string;
  score: number;
  text: string;
}

export interface CreateAnswersProps {
  answers: InsertAnswer[];
}
