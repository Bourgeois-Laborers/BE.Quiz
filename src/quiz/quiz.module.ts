import { Module } from '@nestjs/common';

import { QuizConfigurationModule } from './quiz-configuration/quiz-configuration.module';
import { QuizExecutionModule } from './quiz-execution/quiz-execution.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { SessionModule } from './sesstion/session.module';
import { UserModule } from './user/user.module';

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
