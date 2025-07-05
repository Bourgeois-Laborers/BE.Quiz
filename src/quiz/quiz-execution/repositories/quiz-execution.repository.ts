import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/prisma';

import {
  ICheckIsUserAnswered,
  ISetAnswer,
  IStart,
} from './interfaces/quiz-execution.repository.interface';
import { Status } from '../types/status.types';

@Injectable()
export class QuizExecutionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async startQuiz({
    quizConfigurationId,
    sessionId,
    shareAnswers,
    timePerQuestion,
  }: IStart) {
    return this.prismaService.quizExecutionTable.create({
      data: {
        shareAnswers,
        timePerQuestion,
        session: {
          connect: {
            id: sessionId,
          },
        },
        status: Status.EXECUTING,
        quizConfiguration: {
          connect: {
            id: quizConfigurationId,
          },
        },
      },
    });
  }

  async checkIsUserAnswered({
    questionId,
    quizExecutionId,
    userId,
  }: ICheckIsUserAnswered) {
    const checkIsUserAnswered =
      await this.prismaService.quizExecutionResultTable.count({
        where: {
          quizExecution: {
            id: quizExecutionId,
          },
          question: {
            id: questionId,
          },
          user: {
            id: userId,
          },
        },
      });

    return !!checkIsUserAnswered;
  }

  async setAnswer({
    userId,
    answerId,
    questionId,
    quizExecutionId,
  }: ISetAnswer) {
    return this.prismaService.quizExecutionResultTable.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        answer: {
          connect: {
            id: answerId,
          },
        },
        question: {
          connect: {
            id: questionId,
          },
        },
        quizExecution: {
          connect: {
            id: quizExecutionId,
          },
        },
      },
    });
  }

  async updateQuizExecutionStatus(quizExecutionId: string, status: Status) {
    return this.prismaService.quizExecutionTable.update({
      where: {
        id: quizExecutionId,
      },
      data: {
        finishedAt: new Date(),
        status,
      },
    });
  }

  async getQuizExecution(quizExecutionId: string, userId?: string) {
    const where: Prisma.QuizExecutionWhereUniqueInput = {
      id: quizExecutionId,
    };

    if (userId) {
      where.session = {
        sessionUsers: {
          some: {
            user: {
              id: userId,
            },
            isHost: true,
          },
        },
      };
    }

    return this.prismaService.quizExecutionTable.findUnique({
      where,
      include: {
        quizConfiguration: true,
        session: true,
      },
    });
  }
}
