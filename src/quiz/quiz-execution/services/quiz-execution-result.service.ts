import { QuizExecutionStatus } from '@app/prisma';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SessionToUserService } from '@quiz/sesstion/services/session-to-user.service';

import {
  IQuizExecutionResultService,
  ISetAnswer,
} from './interfaces/quiz-execution-result.repository.interface';
import { QuizExecutionCacheService } from '../cache/cache.service';
import { QuizExecutionResultRepository } from '../repositories/quiz-execution-result.repository';

@Injectable()
export class QuizExecutionResultService implements IQuizExecutionResultService {
  constructor(
    private readonly quizExecutionRepository: QuizExecutionResultRepository,
    private readonly sessionToUserService: SessionToUserService,
    private readonly cacheService: QuizExecutionCacheService, // Assuming this is the correct type for cacheService
  ) {}

  async setAnswer({
    answerId,
    questionId,
    quizExecutionId,
    userId,
    sessionId,
  }: ISetAnswer) {
    const quizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!quizExecutionState) {
      throw new InternalServerErrorException('Quiz execution state not found');
    }

    if (quizExecutionState.status !== QuizExecutionStatus.EXECUTING) {
      throw new BadRequestException('Quiz execution already finished');
    }

    const isQuestionAlreadyAnswered = Object.entries(
      quizExecutionState.questionsState,
    ).find(([id, question]) => id === questionId && question.finishedAt);

    if (isQuestionAlreadyAnswered) {
      throw new BadRequestException('Question already answered');
    }

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (!currentQuestion) {
      throw new BadRequestException('Question not started');
    }

    return this.quizExecutionRepository.setAnswer({
      userId,
      questionId,
      quizExecutionId,
      answerId,
    });
  }
}
