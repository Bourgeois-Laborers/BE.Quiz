import { QuizQuestion } from '@app/gpt/interfaces/quiz.interface';

import { IAnswer } from './answer.repository.interfaces';

export interface IQuestion {
  complexity: string;
  question: string;
  id: string;
  quizConfigurationId: string;
  answers?: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IInsertQuestion {
  quizConfigurationId: string;
  questions: QuizQuestion[];
}

export const IQuestionRepository = Symbol('IQuestionRepository');

export interface IQuestionRepository {
  insertQuestion(props: IInsertQuestion): IQuestion[];
  getQuestions(quizConfigurationId: string): Promise<IQuestion[]>;
  getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null>;
}
