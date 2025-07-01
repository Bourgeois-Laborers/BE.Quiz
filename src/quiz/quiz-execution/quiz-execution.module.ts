import { Module } from '@nestjs/common';
import { QuizExecutionResultController } from './controllers/quiz-execution-result.controller';
import { QuizExecutionController } from './controllers/quiz-execution.controller';
import { QuizExecutionResultService } from './services/quiz-execution-result.service';
import { QuizExecutionService } from './services/quiz-execution.service';
import { CacheModule } from '@app/cache/cache.module';
import { SessionModule } from '@quiz/sesstion/session.module';
import { QuizExecutionRepository } from './repositories/quiz-execution.repository';
import { QuizExecutionResultRepository } from './repositories/quiz-execution-result.repository';
import { QuizExecutionCacheService } from './cache/cache.service';
import { QuizQuestionModule } from '@quiz/quiz-question/quiz-question.module';
import { PrismaModule } from '@app/prisma';

@Module({
  imports: [CacheModule, SessionModule, QuizQuestionModule, PrismaModule],
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
