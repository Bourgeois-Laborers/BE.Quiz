import { SortOrder } from '@common/types/sort-order.enum';

export interface IQuizConfigiration {
  id: string;
  name: string;
  prompt: string;
  questionsCount: number;
  userId: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateQuizConfiguration {
  name: string;
  prompt: string;
  questionsCount: number;
  userId: string;
  isPrivate: boolean;
}

export interface IGetQuizConfiguration {
  quizConfigurationId: string;
  userId: string;
}

export interface IGetQuizConfigurations {
  page: number;
  pageSize: number;
  search?: string;
  sortBy: string;
  sortOrder: SortOrder;
  userId: string;
}

export interface IQuizConfigurationRepository {
  create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration>;
  checkIsUserOwner(
    quizConfigurationId: string,
    userId: string,
  ): Promise<boolean>;
  getQuizConfigurations(
    dto: IGetQuizConfigurations,
  ): Promise<{ configs: IQuizConfigiration[]; totalPage: number }>;
}
