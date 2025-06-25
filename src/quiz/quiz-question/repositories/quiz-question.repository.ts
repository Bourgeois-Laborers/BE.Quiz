import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { IInsertQuestion } from './interfaces/question.repository.interface';
import { Prisma } from 'prisma/prisma';

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
}
