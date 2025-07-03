import { IQuestion } from '../repositories/interfaces/question.repository.interface';

export const IQuizExecutionCacheServiceCacheService = Symbol(
  'IQuizExecutionCacheServiceCacheService',
);

export interface IQuizExecutionCacheServiceCacheService {
  setQuestions(
    quizConfigurationId: string,
    questions: IQuestion[],
  ): Promise<void>;
  getQuestions(quizConfigurationId: string): Promise<IQuestion[]>;
  getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null>;
}
