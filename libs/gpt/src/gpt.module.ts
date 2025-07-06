import { Module } from '@nestjs/common';

import { gptProvider } from './gpt.provider';
import { GptService } from './gpt.service';

@Module({
  providers: [GptService, gptProvider],
  exports: [GptService],
})
export class GptModule {}
