import { Injectable } from '@nestjs/common';

import {
  IQuizExecutionResultService,
  ISetAnswer,
} from './interfaces/quiz-execution-result.repository.interface';
import { QuizExecutionResultRepository } from '../repositories/quiz-execution-result.repository';

import { SessionToUserService } from '@/modules/sesstion/services/session-to-user.service';

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
