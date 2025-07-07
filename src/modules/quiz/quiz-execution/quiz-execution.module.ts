import { CacheModule } from '@app/cache/cache.module';
import { PrismaModule } from '@app/prisma';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { QuizExecutionCacheService } from './cache/cache.service';
import { QuizExecutionResultController } from './controllers/quiz-execution-result.controller';
import { QuizExecutionController } from './controllers/quiz-execution.controller';
import { QuizExecutionGateway } from './gateway/quiz-execution.gateway';
import { IQuizExecutionGatewayInterface } from './gateway/quiz-execution.gateway.interface';
import { QuizExecutionProcessor } from './queue/quiz-execution.processor';
import { QuizExecutionResultRepository } from './repositories/quiz-execution-result.repository';
import { QuizExecutionRepository } from './repositories/quiz-execution.repository';
import { QuizExecutionResultService } from './services/quiz-execution-result.service';
import { QuizExecutionService } from './services/quiz-execution.service';
import { QueueNames } from './types/queue.types';

import { QuizQuestionModule } from '@/modules/quiz/quiz-question/quiz-question.module';
import { SocketModule } from '@/modules/socket/socket.module';

@Module({
  imports: [
    CacheModule,
    QuizQuestionModule,
    PrismaModule,
    QuizQuestionModule,
    SocketModule,
    BullModule.registerQueue({
      name: QueueNames.QUIZ_EXECUTION,
    }),
  ],
  providers: [
    QuizExecutionResultService,
    QuizExecutionService,
    QuizExecutionRepository,
    QuizExecutionResultRepository,
    QuizExecutionCacheService,
    QuizExecutionProcessor,
    {
      provide: IQuizExecutionGatewayInterface,
      useClass: QuizExecutionGateway,
    },
  ],
  controllers: [QuizExecutionController, QuizExecutionResultController],
})
export class QuizExecutionModule {}
