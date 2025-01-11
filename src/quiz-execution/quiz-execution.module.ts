import { Module } from '@nestjs/common';

import { QuizExecutionService } from '@quiz-execution/quiz-execution.service';
import { QuizExecutionController } from '@quiz-execution/quiz-execution.controller';

@Module({
  controllers: [QuizExecutionController],
  providers: [QuizExecutionService],
})
export class QuizExecutionModule {}
