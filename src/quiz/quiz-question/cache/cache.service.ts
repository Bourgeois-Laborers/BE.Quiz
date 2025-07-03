import { INJECT_CACHE } from '@app/cache/cache.types';
import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

import { IQuizExecutionCacheServiceCacheService } from './cache.interface';
import { IQuestion } from '../repositories/interfaces/question.repository.interface';

@Injectable()
export class QuizQuestionCacheService
  implements IQuizExecutionCacheServiceCacheService
{
  constructor(@Inject(INJECT_CACHE) private cacheManager: RedisClientType) {}

  async getQuestions(quizConfigurationId: string): Promise<IQuestion[]> {
    const questions = await this.cacheManager.json.get(
      this.buildKey(quizConfigurationId),
    );

    return questions ? (JSON.parse(questions as string) as IQuestion[]) : [];
  }

  async getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null> {
    const question = await this.cacheManager.json.get(
      this.buildKey(quizConfigurationId),
      {
        path: '$.[' + questionId + ']',
      },
    );

    return question ? (JSON.parse(question as string) as IQuestion) : null;
  }

  async setQuestions(
    quizConfigurationId: string,
    questions: IQuestion[],
  ): Promise<void> {
    await this.cacheManager.json.set(
      this.buildKey(quizConfigurationId),
      '$',
      JSON.stringify(questions),
    );
  }

  private buildKey(quizConfigurationId: string): string {
    return `quiz-configuration:${quizConfigurationId}:questions`;
  }
}
