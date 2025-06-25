import { Injectable } from '@nestjs/common';
import {
  IQuizExecutionService,
  IStart,
} from './interfaces/quiz-execution.service.interface';
import { QuizConfigurationRepository } from '@quiz/quiz-configuration/repositories/quiz-configuration.repository';
import { QuizExecutionRepository } from '../repositories/quiz-execution.repository';

@Injectable()
export class QuizExecutionService implements IQuizExecutionService {
  constructor(
    private readonly quizExecutionRepository: QuizExecutionRepository,
  ) {}

  async start({
    userId,
    sessionId,
    quizConfigurationId,
    shareAnswers,
    timePerQuestion,
  }: IStart) {
    const quizConfiguration = await this.quizExecutionRepository.startQuiz({
      sessionId,
      quizConfigurationId,
      shareAnswers,
      timePerQuestion,
    });
  }

  async setAnswer(
    quizId: string,
    questionId: string,
    answer: string,
    userId: string,
  ) {
    // Logic to set the answer for a question in the quiz
  }

  async finishAnswer(quizId: string, questionId: string, userId: string) {
    // Logic to finish answering a question in the quiz
  }

  async finishQuiz(quizId: string, userId: string) {
    // Logic to finish the quiz for the user
  }
}
