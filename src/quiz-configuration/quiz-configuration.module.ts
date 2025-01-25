import { Module } from '@nestjs/common';

import { QuizConfigurationService } from '@quiz-configuration/quiz-configuration.service';
import { QuizConfigurationController } from '@quiz-configuration/quiz-configuration.controller';

import { GptModule } from '@libs/gpt';

import { DatabaseModule } from '@database/database.module';

@Module({
  imports: [GptModule, DatabaseModule],
  controllers: [QuizConfigurationController],
  providers: [QuizConfigurationService],
})
export class QuizConfigurationModule {}
