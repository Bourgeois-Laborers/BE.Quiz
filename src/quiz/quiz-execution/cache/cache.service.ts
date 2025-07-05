import { INJECT_CACHE_CLIENT } from '@app/cache/cache.types';
import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import {
  IQuizExecutionCacheServiceCacheService,
  IFinishQuestion,
  IQuizExecutionState,
  ISetupQuizExecution,
  IStartQuestion,
} from './cache.interface';
import { Status } from '../types/status.types';

@Injectable()
export class QuizExecutionCacheService
  implements IQuizExecutionCacheServiceCacheService
{
  constructor(
    @Inject(INJECT_CACHE_CLIENT) private cacheManager: RedisClientType,
  ) {}

  async setupQuizExecution({
    quizExecutionId,
    sessionId,
    shareAnswers,
    timePerQuestion,
    status,
  }: ISetupQuizExecution): Promise<void> {
    await this.cacheManager.json.set(
      this.buildKey(sessionId, quizExecutionId),
      '$',
      {
        questionsState: {},
        quizExecutionId,
        sessionId,
        shareAnswers,
        timePerQuestion,
        status,
      },
    );
  }

  async getQuizExecution(
    sessionId: string,
    quizExecutionId: string,
  ): Promise<IQuizExecutionState | null> {
    const key = this.buildKey(sessionId, quizExecutionId);
    const value = await this.cacheManager.json.get(key);

    if (!value) {
      return null;
    }

    return value as unknown as IQuizExecutionState;
  }

  async startQuestion({
    questionId,
    quizExecutionId,
    sessionId,
    startedAt,
  }: IStartQuestion): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);

    await this.cacheManager.json.set(key, `$.questionsState.${questionId}`, {
      questionId,
      startedAt: startedAt.toISOString(),
      finishedAt: null,
    });
  }

  async finishQuestion({
    finishedAt,
    questionId,
    quizExecutionId,
    sessionId,
  }: IFinishQuestion): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);

    await this.cacheManager.json.set(
      key,
      '$.questionsState.' + questionId + '.finishedAt',
      finishedAt,
    );
  }

  async updateQuestionStatus(
    sessionId: string,
    quizExecutionId: string,
    status: Status,
  ): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);

    await this.cacheManager.json.set(key, '$.status', status);
  }

  async finishQuiz(sessionId: string, quizExecutionId: string): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);
    await this.cacheManager.json.del(key);
  }

  private buildKey(sessionId: string, quizConfigurationId: string): string {
    return `quiz-execution:${sessionId}:${quizConfigurationId}`;
  }
}
