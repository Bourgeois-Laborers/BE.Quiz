import { Module } from '@nestjs/common';

import { QuizConfigurationModule } from '~/quiz/quiz-configuration/quiz-configuration.module';
import { QuizExecutionModule } from '~/quiz/quiz-execution/quiz-execution.module';
import { QuizQuestionModule } from '~/quiz/quiz-question/quiz-question.module';
import { SessionModule } from '~/quiz/sesstion/session.module';
import { UserModule } from '~/quiz/user/user.module';

@Module({
  imports: [
    UserModule,
    SessionModule,
    QuizConfigurationModule,
    QuizQuestionModule,
    QuizExecutionModule,
  ],
})
export class QuizModule {}
