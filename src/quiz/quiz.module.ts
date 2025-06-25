import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './sesstion/session.module';
import { QuizConfigurationModule } from './quiz-configuration/quiz-configuration.module';
import { QuizQuestionModule } from './quiz-question/quiz-question.module';
import { QuizExecutionModule } from './quiz-execution/quiz-execution.module';

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
