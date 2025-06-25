import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { QuizConfigurationRepository } from './repositories/quiz-configuration.repository';
import { QuizConfigurationService } from './services/quiz-configuration.service';
import { QuizConfigurationController } from './controllers/quiz-configuration.controller';

@Module({
  imports: [PrismaModule],
  controllers: [QuizConfigurationController],
  providers: [QuizConfigurationService, QuizConfigurationRepository],
  exports: [QuizConfigurationService],
})
export class QuizConfigurationModule {}
