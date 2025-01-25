import OpenAI from 'openai';

import { Inject, Injectable } from '@nestjs/common';

import { GPT_CLIENT_PROVIDER } from './constants';
import { Quiz } from './interfaces/quiz.interface';
import { createQuizResponse } from './stubs/create-quiz.stubs';

@Injectable()
export class GptService {
  constructor(@Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI) {}

  public async generateQuiz(): Promise<Quiz[]> {
    return new Promise((res) => res(createQuizResponse));
  }
}
