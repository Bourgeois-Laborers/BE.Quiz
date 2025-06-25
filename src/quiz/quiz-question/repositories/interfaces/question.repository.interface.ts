import { QuizQuestion } from '@app/gpt/interfaces/quiz.interface';

export interface IQuestion {
  complexity: string;
  question: string;
  id: string;
  quizConfigurationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IInsertQuestion {
  quizConfigurationId: string;
  questions: QuizQuestion[];
}

export interface IQuestionRepository {
  insertQuestion(props: IInsertQuestion): IQuestion[];
}
