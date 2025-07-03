import { IQuestion } from '../../repositories/interfaces/question.repository.interface';

export interface IInsertQuestion {
  quizConfigurationId: string;
  prompt: string;
  userId: string;
}

export interface IQuestionService {
  insertQuestions(props: IInsertQuestion): Promise<IQuestion[]>;
  getQuestions(quizConfigurationId: string): Promise<IQuestion[]>;
  getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null>;
}
