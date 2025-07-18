import { INJECT_CACHE_CLIENT } from '@app/cache/cache.types';
import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { IQuizExecutionCacheServiceCacheService } from './cache.interface';
import { IQuestion } from '../repositories/interfaces/question.repository.interface';

@Injectable()
export class QuizQuestionCacheService
  implements IQuizExecutionCacheServiceCacheService
{
  constructor(
    @Inject(INJECT_CACHE_CLIENT) private cacheManager: RedisClientType,
  ) {}

  async getQuestions(quizConfigurationId: string): Promise<IQuestion[]> {
    const questions = await this.cacheManager.get(
      this.buildKey(quizConfigurationId),
    );

    return questions ? (JSON.parse(questions) as IQuestion[]) : [];
  }

  async getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null> {
    const questions = await this.cacheManager.get(
      this.buildKey(quizConfigurationId),
    );

    if (!questions) {
      return null;
    }

    const parsedQuestions = JSON.parse(questions) as IQuestion[];

    return (
      parsedQuestions.find((question) => question.id === questionId) || null
    );
  }

  async setQuestions(
    quizConfigurationId: string,
    questions: IQuestion[],
  ): Promise<void> {
    console.log('setQuestions', quizConfigurationId, questions);
    await this.cacheManager.set(
      this.buildKey(quizConfigurationId),
      JSON.stringify(questions),
    );
  }

  private buildKey(quizConfigurationId: string): string {
    return `quiz-configuration:${quizConfigurationId}:questions`;
  }
}
