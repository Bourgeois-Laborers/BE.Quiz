import { GptService } from '@app/gpt';
import { Inject, Injectable } from '@nestjs/common';

import { QuizQuestionRepository } from '../repositories/quiz-question.repository';
import {
  IInsertQuestion,
  IQuestionService,
} from './interfaces/question.service.interface';
import { IQuizExecutionCacheServiceCacheService } from '../cache/cache.interface';
import { IQuestion } from '../repositories/interfaces/question.repository.interface';

import { QuizConfigurationService } from '@/modules/quiz/quiz-configuration/services/quiz-configuration.service';

@Injectable()
export class QuizQuestionService implements IQuestionService {
  constructor(
    private readonly questionRepository: QuizQuestionRepository,
    private readonly gptService: GptService,
    private readonly quizConfigurationService: QuizConfigurationService,
    @Inject(IQuizExecutionCacheServiceCacheService)
    private readonly cacheService: IQuizExecutionCacheServiceCacheService,
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

  async getQuestions(quizConfigurationId: string): Promise<IQuestion[]> {
    const cachedQuestions =
      await this.cacheService.getQuestions(quizConfigurationId);

    if (cachedQuestions.length > 0) {
      return cachedQuestions;
    }

    const questions =
      await this.questionRepository.getQuestions(quizConfigurationId);

    await this.cacheService.setQuestions(quizConfigurationId, questions);

    return questions;
  }

  async getQuestion(
    quizConfigurationId: string,
    questionId: string,
  ): Promise<IQuestion | null> {
    const cachedQuestion = await this.cacheService.getQuestion(
      quizConfigurationId,
      questionId,
    );

    if (cachedQuestion) {
      return cachedQuestion;
    }

    return this.questionRepository.getQuestion(quizConfigurationId, questionId);
  }
}
