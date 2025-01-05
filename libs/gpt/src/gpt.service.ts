import OpenAI from 'openai';

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class GptService {
  constructor(@Inject('GPT_CLIENT') private readonly gptClient: OpenAI) {}
}
