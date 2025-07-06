import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

import { IQuizExecutionResultRepository } from './interfaces/quiz-execution-result.repository.interface';
import { ISetAnswer } from './interfaces/quiz-execution.repository.interface';

@Injectable()
export class QuizExecutionResultRepository
  implements IQuizExecutionResultRepository
{
  constructor(private readonly prismaService: PrismaService) {}

  async setAnswer({
    userId,
    questionId,
    quizExecutionId,
    answerId,
  }: ISetAnswer) {
    const userAnswer =
      await this.prismaService.quizExecutionResultTable.findFirst({
        where: {
          user: {
            id: userId,
          },
          question: { id: questionId },
          quizExecution: {
            id: quizExecutionId,
          },
        },
      });

    if (userAnswer) {
      return this.prismaService.quizExecutionResultTable.update({
        where: {
          id: userAnswer.id,
        },
        data: {
          answer: {
            connect: {
              id: answerId,
            },
          },
        },
      });
    }

    return this.prismaService.quizExecutionResultTable.create({
      data: {
        user: {
          connect: {
            id: userId,
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
        answer: {
          connect: {
            id: answerId,
          },
        },
      },
    });
  }
}
