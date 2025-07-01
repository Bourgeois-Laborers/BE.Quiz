import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { GPT_CLIENT_PROVIDER } from './constants/gpt.constants';
import { QuizQuestion } from './interfaces/quiz.interface';
import { createQuizResponse } from './stubs/create-quiz.stubs';

@Injectable()
export class GptService {
  constructor(
    @Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI,
  ) {}

  public async generateQuiz(prompt: string): Promise<QuizQuestion[]> {
    return new Promise((res) => res(createQuizResponse));
  }
}
