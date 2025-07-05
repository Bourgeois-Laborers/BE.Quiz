import { SortOrder } from '@common/types/sort-order.enum';

import { IQuizConfigiration } from '../../repositories/interfaces/quiz-configuration.repository.interface';

export interface ICreateQuizConfiguration {
  name: string;
  prompt: string;
  questionsCount: number;
  userId: string;
  isPrivate: boolean;
}

export interface IGetQuizConfigurations {
  page: number;
  pageSize: number;
  search?: string;
  sortBy: string;
  sortOrder: SortOrder;
  userId: string;
}

export interface IQuizConfigurationResvice {
  create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration>;
  checkIsUserOwner(
    quizConfigurationId: string,
    userId: string,
  ): Promise<boolean>;
  getQuizConfigurations(
    props: IGetQuizConfigurations,
  ): Promise<{ configs: IQuizConfigiration[]; totalPage: number }>;
}
