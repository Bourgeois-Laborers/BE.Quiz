import { Injectable } from '@nestjs/common';
import { QuizQuestionRepository } from '../repositories/quiz-question.repository';
import {
  IInsertQuestion,
  IQuestionService,
} from './interfaces/question.service.interface';
import { IQuestion } from '../repositories/interfaces/question.repository.interface';
import { GptService } from '@app/gpt';
import { QuizConfigurationService } from 'src/quiz/quiz-configuration/services/quiz-configuration.service';

@Injectable()
export class QuizQuestionService implements IQuestionService {
  constructor(
    private readonly questionRepository: QuizQuestionRepository,
    private readonly gptService: GptService,
    private readonly quizConfigurationService: QuizConfigurationService,
  ) {}

  async insertQuestions({
    prompt,
    quizConfigurationId,
    userId,
  }: IInsertQuestion): Promise<IQuestion[]> {
    await this.quizConfigurationService.checkIsUserOwner(
      quizConfigurationId,
      userId,
    );

    const result = await this.gptService.generateQuiz(prompt);

    return this.questionRepository.insertQuestion({
      quizConfigurationId: quizConfigurationId,
      questions: result.map(
        ({ complexity, question, questionAnswers, order }) => ({
          complexity,
          question,
          questionAnswers,
          order,
        }),
      ),
    });
  }
}
