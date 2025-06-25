import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { GPT_CLIENT_PROVIDER } from './constants/gpt.constants';

export const gptProvider = {
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
};
