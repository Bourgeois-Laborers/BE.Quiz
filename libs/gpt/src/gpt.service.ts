import OpenAI from 'openai';

import { Inject, Injectable } from '@nestjs/common';

import { GPT_CLIENT_PROVIDER } from './constants';

@Injectable()
export class GptService {
  constructor(@Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI) {}
}
