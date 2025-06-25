import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { IStart } from './interfaces/quiz-execution.repository.interface';

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
        quizConfiguration: {
          connect: {
            id: quizConfigurationId,
          },
        },
      },
    });
  }
}
