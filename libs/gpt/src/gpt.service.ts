import { Inject, Injectable } from '@nestjs/common';
import OpenAI from 'openai';

import { GPT_CLIENT_PROVIDER } from './constants/gpt.constants';
import { QuizQuestion } from './interfaces/quiz.interface';

@Injectable()
export class GptService {
  constructor(
    @Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI,
  ) {}

  public async generateQuiz(prompt: string): Promise<QuizQuestion[]> {
    //TO DO: Refactor and validate the response
    const response = await this.gptClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a quiz generator. You will be given a topic and you will need to generate a quiz with 10 questions. The response should be JSON without comments in the following format: {question: string, complexity: number, order: number, questionAnswers: {answer: string, score: number}[]}',
        },
        { role: 'user', content: prompt },
      ],
    });

    console.log(response.choices[0].message.content);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(response.choices[0].message.content || '[]');
  }
}
