import { GptModule } from '@app/gpt';
import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { QuizQuestionRepository } from './repositories/quiz-question.repository';
import { QuizQuestionService } from './services/quiz-question.service';
import { QuizQuestionController } from './controllers/quiz-question.controller';
import { QuizConfigurationModule } from '../quiz-configuration/quiz-configuration.module';

@Module({
  imports: [GptModule, PrismaModule, QuizConfigurationModule],
  controllers: [QuizQuestionController],
  providers: [QuizQuestionRepository, QuizQuestionService],
  exports: [QuizQuestionService],
})
export class QuizQuestionModule {}
