import { Injectable } from '@nestjs/common';
import { SessionToUserService } from '@quiz/sesstion/services/session-to-user.service';

import {
  IQuizExecutionResultService,
  ISetAnswer,
} from './interfaces/quiz-execution-result.repository.interface';
import { QuizExecutionResultRepository } from '../repositories/quiz-execution-result.repository';

@Injectable()
export class QuizExecutionResultService implements IQuizExecutionResultService {
  constructor(
    private readonly quizExecutionRepository: QuizExecutionResultRepository,
    private readonly sessionToUserService: SessionToUserService,
  ) {}

  async setAnswer({
    answerId,
    questionId,
    quizExecutionId,
    userId,
  }: ISetAnswer) {
    return this.quizExecutionRepository.setAnswer({
      userId,
      questionId,
      quizExecutionId,
      answerId,
    });
  }
}
