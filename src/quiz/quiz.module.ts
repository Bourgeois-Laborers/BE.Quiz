import { Module } from '@nestjs/common';

import { QuizConfigurationModule } from '@/quiz/quiz-configuration/quiz-configuration.module';
import { QuizExecutionModule } from '@/quiz/quiz-execution/quiz-execution.module';
import { QuizQuestionModule } from '@/quiz/quiz-question/quiz-question.module';

@Module({
  imports: [QuizConfigurationModule, QuizQuestionModule, QuizExecutionModule],
})
export class QuizModule {}
