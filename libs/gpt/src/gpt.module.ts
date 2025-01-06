import OpenAI from 'openai';

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { GptService } from './gpt.service';

import { GPT_CLIENT_PROVIDER } from './constants';

@Module({
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
      inject: [ConfigService],
      provide: GPT_CLIENT_PROVIDER,
    },
  ],
  exports: [GptService],
})
export class GptModule {}
