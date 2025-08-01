import { CacheModule } from '@app/cache';
import { GptModule } from '@app/gpt';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';

import { IQuizExecutionCacheServiceCacheService } from './cache/cache.interface';
import { QuizQuestionCacheService } from './cache/cache.service';
import { QuizQuestionController } from './controllers/quiz-question.controller';
import { QuizQuestionRepository } from './repositories/quiz-question.repository';
import { QuizQuestionService } from './services/quiz-question.service';

import { QuizConfigurationModule } from '@/modules/quiz/quiz-configuration/quiz-configuration.module';

@Module({
  imports: [GptModule, PrismaModule, QuizConfigurationModule, CacheModule],
  controllers: [QuizQuestionController],
  providers: [
    QuizQuestionRepository,
    QuizQuestionService,
    {
      provide: IQuizExecutionCacheServiceCacheService,
      useClass: QuizQuestionCacheService,
    },
  ],
  exports: [QuizQuestionService],
})
export class QuizQuestionModule {}
