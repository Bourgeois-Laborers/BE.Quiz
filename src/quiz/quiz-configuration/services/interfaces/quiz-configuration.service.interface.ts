import { IQuizConfigiration } from '../../repositories/interfaces/quiz-configuration.repository.interface';

export interface ICreateQuizConfiguration {
  name: string;
  prompt: string;
  questionsCount: number;
  userId: string;
}

export interface IQuizConfigurationResvice {
  create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration>;
  checkIsUserOwner(
    quizConfigurationId: string,
    userId: string,
  ): Promise<boolean>;
}
