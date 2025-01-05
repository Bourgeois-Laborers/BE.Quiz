import OpenAI from 'openai';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { GptService } from './gpt.service';

@Module({
  imports: [ConfigModule],
  providers: [
    GptService,
    {
      useFactory: (configService: ConfigService) => {
        const openai = new OpenAI({
          organization: configService.getOrThrow('GPT_ORGANIZATION'),
          project: configService.getOrThrow('GPT_PROJECT'),
          apiKey: configService.getOrThrow('GPT_API_KEY'),
        });

        return openai;
      },
      inject: [ConfigModule],
      provide: 'GPT_CLIENT',
    },
  ],
  exports: [GptService],
})
export class GptModule {}
