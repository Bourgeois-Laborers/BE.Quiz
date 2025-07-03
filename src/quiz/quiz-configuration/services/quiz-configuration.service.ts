import { SortOrder } from '@common/types/sort-order.enum';
import { ForbiddenException, Injectable } from '@nestjs/common';

import {
  ICreateQuizConfiguration,
  IGetQuizConfigurations,
  IQuizConfigurationResvice,
} from './interfaces/quiz-configuration.service.interface';
import { IQuizConfigiration } from '../repositories/interfaces/quiz-configuration.repository.interface';
import { QuizConfigurationRepository } from '../repositories/quiz-configuration.repository';

@Injectable()
export class QuizConfigurationService implements IQuizConfigurationResvice {
  constructor(
    private readonly quizConfigurationRepository: QuizConfigurationRepository,
  ) {}

  async create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration> {
    return this.quizConfigurationRepository.create(props);
  }

  async checkIsUserOwner(
    quizConfigurationId: string,
    userId: string,
  ): Promise<boolean> {
    const isUserOwner = await this.quizConfigurationRepository.checkIsUserOwner(
      quizConfigurationId,
      userId,
    );

    if (!isUserOwner) {
      throw new ForbiddenException(
        'You are not the owner of this quiz configuration',
      );
    }

    return isUserOwner;
  }

  async getQuizConfigurations(
    props: IGetQuizConfigurations,
  ): Promise<{ configs: IQuizConfigiration[]; totalPage: number }> {
    const { userId, sortOrder, page, pageSize, search, sortBy } = props;

    return this.quizConfigurationRepository.getQuizConfigurations({
      userId,
      sortOrder: sortOrder || SortOrder.ASC,
      page: page || 1,
      pageSize: pageSize || 10,
      search,
      sortBy: sortBy || 'id',
    });
  }
}
