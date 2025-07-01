import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

import {
  ICreateQuizConfiguration,
  IQuizConfigiration,
  IQuizConfigurationRepository,
} from './interfaces/quiz-configuration.repository.interface';

@Injectable()
export class QuizConfigurationRepository
  implements IQuizConfigurationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration> {
    const { name, prompt, questionsCount } = props;

    return this.prismaService.quizConfigurationTable.create({
      data: {
        name,
        prompt,
        questionsCount,
        user: {
          connect: {
            id: props.userId,
          },
        },
      },
    });
  }

  async checkIsUserOwner(quizConfigurationId: string, userId: string) {
    const quizConfiguration =
      await this.prismaService.quizConfigurationTable.count({
        where: {
          id: quizConfigurationId,
          user: {
            id: userId,
          },
        },
      });

    return !!quizConfiguration;
  }
}
