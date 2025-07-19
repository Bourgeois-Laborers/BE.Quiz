import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { ChatCompletionTool } from 'openai/resources/chat/completions';
import { ChatModel } from 'openai/resources/shared';

import { GPT_CLIENT_PROVIDER } from './constants/gpt.constants';
import { QuizQuestion } from './interfaces/quiz.interface';
import { generateQuiz } from './utils/generate-quiz';

@Injectable()
export class GptService {
  constructor(
    @Inject(GPT_CLIENT_PROVIDER) private readonly gptClient: OpenAI,
    private readonly configService: ConfigService,
  ) {}

  public async generateQuiz(prompt: string): Promise<QuizQuestion[]> {
    const response = await this.gptClient.chat.completions.create({
      model: this.configService.get('GPT_MODEL') as ChatModel,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'You are a quiz generator. You will be given a topic and you will need to generate a quiz with 10 questions. Each question must have exactly 4 answers with scores from 0 to 100. The response should be JSON without comments in the following format: {"quiz": [{"question": "string", "complexity": number, "order": number, "questionAnswers": [{"answer": "string", "score": number}]}]}',
        },
        { role: 'user', content: prompt },
      ],
      tools: [generateQuiz as ChatCompletionTool],
      tool_choice: { type: 'function', function: { name: 'generate_quiz' } },
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];

    if (!toolCall || toolCall.function.name !== 'generate_quiz') {
      throw new Error('No valid tool call received');
    }

    const parsed = JSON.parse(toolCall.function.arguments) as {
      quiz: QuizQuestion[];
    };

    return parsed.quiz;
  }
}
