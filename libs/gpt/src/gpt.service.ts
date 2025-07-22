import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatModel } from 'openai/resources/shared';

import { generateQuizResponseSchema } from './constants/generate-quiz-response.schema';
import { GPT_CLIENT_PROVIDER } from './constants/gpt.constants';
import { QuizQuestion } from './interfaces/quiz.interface';

@Injectable()
export class GptService {
  constructor(
    @Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI,
    private readonly configService: ConfigService,
  ) {}

  public async generateQuiz(prompt: string): Promise<QuizQuestion[]> {
    const response = await this.gptClient.chat.completions.create({
      model: this.configService.get('GPT_MODEL') as ChatModel,
      response_format: {
        type: 'json_schema',
        json_schema: generateQuizResponseSchema,
      },
      messages: [
        {
          role: 'system',
          content:
            'You are a quiz generator. You will be given a topic and you will need to generate a quiz with 10 questions. Each question must have exactly 4 answers with scores from 0 to 100. The response should be JSON without comments in the following format: {"quiz": [{"question": "string", "complexity": number, "order": number, "questionAnswers": [{"answer": "string", "score": number}]}]}',
        },
        { role: 'user', content: prompt },
      ],
    });

    const parsed = JSON.parse(
      response.choices[0]?.message?.content as string,
    ) as {
      quiz: QuizQuestion[];
    };

    return parsed.quiz;
  }
}
