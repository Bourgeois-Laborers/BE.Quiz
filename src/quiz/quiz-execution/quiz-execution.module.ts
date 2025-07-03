import { CacheModule } from '@app/cache/cache.module';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { QuizQuestionModule } from '@quiz/quiz-question/quiz-question.module';
import { SessionModule } from '@quiz/sesstion/session.module';

import { QuizExecutionCacheService } from './cache/cache.service';
import { QuizExecutionResultController } from './controllers/quiz-execution-result.controller';
import { QuizExecutionController } from './controllers/quiz-execution.controller';
import { QuizExecutionResultRepository } from './repositories/quiz-execution-result.repository';
import { QuizExecutionRepository } from './repositories/quiz-execution.repository';
import { QuizExecutionResultService } from './services/quiz-execution-result.service';
import { QuizExecutionService } from './services/quiz-execution.service';

@Module({
  imports: [
    CacheModule,
    SessionModule,
    QuizQuestionModule,
    PrismaModule,
    QuizQuestionModule,
  ],
  providers: [
    QuizExecutionResultService,
    QuizExecutionService,
    QuizExecutionRepository,
    QuizExecutionResultRepository,
    QuizExecutionCacheService,
  ],
  controllers: [QuizExecutionController, QuizExecutionResultController],
})
export class QuizExecutionModule {}
