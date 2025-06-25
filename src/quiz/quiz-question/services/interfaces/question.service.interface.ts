import { IQuestion } from '../../repositories/interfaces/question.repository.interface';

export interface IInsertQuestion {
  quizConfigurationId: string;
  prompt: string;
  userId: string;
}

export interface IQuestionService {
  insertQuestions(props: IInsertQuestion): Promise<IQuestion[]>;
}
