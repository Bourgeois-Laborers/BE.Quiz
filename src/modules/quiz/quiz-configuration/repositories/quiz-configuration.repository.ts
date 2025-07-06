import { PrismaService } from '@app/prisma';
import { Prisma } from '@app/prisma';
import { Injectable } from '@nestjs/common';

import {
  ICreateQuizConfiguration,
  IGetQuizConfigurations,
  IQuizConfigiration,
  IQuizConfigurationRepository,
} from './interfaces/quiz-configuration.repository.interface';

@Injectable()
export class QuizConfigurationRepository
  implements IQuizConfigurationRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async create(props: ICreateQuizConfiguration): Promise<IQuizConfigiration> {
    const { name, prompt, questionsCount, isPrivate } = props;

    return this.prismaService.quizConfigurationTable.create({
      data: {
        name,
        prompt,
        questionsCount,
        isPrivate,
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

  async getQuizConfigurations(
    dto: IGetQuizConfigurations,
  ): Promise<{ configs: IQuizConfigiration[]; totalPage: number }> {
    const { page, pageSize, search, sortBy, sortOrder, userId } = dto;

    const searchCondition: Prisma.QuizConfigurationWhereInput = {
      ...(search && {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      }),
    };

    const where: Prisma.QuizConfigurationWhereInput = {
      OR: [
        {
          ...searchCondition,
          isPrivate: false,
        },
        {
          ...searchCondition,
          user: {
            id: userId,
          },
        },
      ],
    };

    const [result, count] = await Promise.all([
      this.prismaService.quizConfigurationTable.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      this.prismaService.quizConfigurationTable.count({
        where,
      }),
    ]);

    return {
      configs: result,
      totalPage: Math.ceil(count / pageSize),
    };
  }
}
