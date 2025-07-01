import { Inject, Injectable } from '@nestjs/common';
import {
  IQuizExecutionCacheServiceCacheService,
  IFinishQuestion,
  IQuizExecutionState,
  ISetupQuizExecution,
  IStartQuestion,
} from './cache.interface';
import { RedisClientType } from 'redis';
import { INJECT_CACHE } from '@app/cache/cache.types';

@Injectable()
export class QuizExecutionCacheService
  implements IQuizExecutionCacheServiceCacheService
{
  constructor(@Inject(INJECT_CACHE) private cacheManager: RedisClientType) {}

  async setupQuizExecution({
    quizExecutionId,
    sessionId,
    shareAnswers,
    timePerQuestion,
  }: ISetupQuizExecution): Promise<void> {
    await this.cacheManager.json.set(
      this.buildKey(sessionId, quizExecutionId),
      '$',
      JSON.stringify({
        questionsState: {},
        quizExecutionId,
        sessionId,
        shareAnswers,
        timePerQuestion,
      } as IQuizExecutionState),
    );
  }

  async getQuizExecution(
    sessionId: string,
    quizExecutionId: string,
  ): Promise<IQuizExecutionState | null> {
    const key = this.buildKey(sessionId, quizExecutionId);
    const value = await this.cacheManager.json.get(key, { path: '$' });

    return value ? (JSON.parse(value as string) as IQuizExecutionState) : null;
  }

  async startQuestion({
    questionId,
    quizExecutionId,
    sessionId,
    startedAt,
  }: IStartQuestion): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);
    await this.cacheManager.json.set(
      key,
      '$.questionsState.' + questionId,
      JSON.stringify({
        questionId,
        startedAt: startedAt.toISOString(),
        finishedAt: null,
      }),
    );
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
      finishedAt.toISOString(),
    );
  }

  async finishQuiz(sessionId: string, quizExecutionId: string): Promise<void> {
    const key = this.buildKey(sessionId, quizExecutionId);
    await this.cacheManager.json.del(key);
  }

  private buildKey(sessionId: string, quizConfigurationId: string): string {
    return `quiz-execution:${sessionId}:${quizConfigurationId}`;
  }
}
