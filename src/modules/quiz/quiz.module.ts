import { Module } from '@nestjs/common';

import { QuizConfigurationModule } from '@/modules/quiz/quiz-configuration/quiz-configuration.module';
import { QuizExecutionModule } from '@/modules/quiz/quiz-execution/quiz-execution.module';
import { QuizQuestionModule } from '@/modules/quiz/quiz-question/quiz-question.module';

@Module({
  imports: [QuizConfigurationModule, QuizQuestionModule, QuizExecutionModule],
})
export class QuizModule {}
