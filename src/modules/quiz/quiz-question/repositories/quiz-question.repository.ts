import { PrismaService } from '@app/prisma';
import { Prisma } from '@app/prisma';
import { Injectable } from '@nestjs/common';

import { IInsertQuestion } from './interfaces/question.repository.interface';

@Injectable()
export class QuizQuestionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async insertQuestion(props: IInsertQuestion) {
    await this.prismaService.quizQuestionTable.deleteMany({
      where: {
        quizConfiguration: { id: props.quizConfigurationId },
      },
    });

    return Promise.all(
      props.questions.map(
        async ({ complexity, question, questionAnswers, order }) => {
          return this.prismaService.quizQuestionTable.create({
            data: {
              complexity: String(complexity),
              question,
              order,
              quizConfiguration: {
                connect: {
                  id: props.quizConfigurationId,
                },
              },
              answers: {
                createMany: {
                  data: questionAnswers.map(
                    ({ answer, score }) =>
                      ({
                        answer,
                        score,
                      }) as Prisma.QuizAnswerCreateManyQuestionInput,
                  ),
                },
              },
            },
          });
        },
      ),
    );
  }

  async getQuestions(quizConfigurationId: string) {
    return this.prismaService.quizQuestionTable.findMany({
      where: {
        quizConfiguration: { id: quizConfigurationId },
      },
      include: {
        answers: true,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async getQuestion(quizConfigurationId: string, questionId: string) {
    return this.prismaService.quizQuestionTable.findFirst({
      where: {
        id: questionId,
        quizConfiguration: { id: quizConfigurationId },
      },
      include: {
        answers: true,
      },
    });
  }
}
