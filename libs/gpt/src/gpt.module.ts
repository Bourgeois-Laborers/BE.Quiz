import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { gptProvider } from './gpt.provider';

@Module({
  providers: [GptService, gptProvider],
  exports: [GptService],
})
export class GptModule {}
