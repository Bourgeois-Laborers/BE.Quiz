import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { CreateQuizConfigurationProps } from '@quiz-configuration/interface/create-quiz-configuration.interface';

import { QuizConfigurationRepository } from '@database/repositories/quiz-configuration.repository';
import { QuestionRepository } from '@database/repositories/question.repository';
import { AnswerRepository } from '@database/repositories/answer.repository';
import { InsertAnswer } from '@database/repositories/interfaces/create-answers.interface';
import { Privacy, QuizConfiguration } from '@database/entities/quiz-configuration.entity';

import { GptService } from '@libs/gpt';

import { FindAllQuizConfigurationProps } from './interface/find-all-quiz-configuration.interface';
import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionType } from '@common/types/logic-exception-type.enum';

@Injectable()
export class QuizConfigurationService {
  constructor(
    private readonly quizConfigurationRepository: QuizConfigurationRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly gptService: GptService,
    private readonly answerRepository: AnswerRepository,
  ) {}

  public async create({ body, userId }: CreateQuizConfigurationProps): Promise<{ id: string }> {
    const generatedQuiz = await this.gptService.generateQuiz();

    const savedQuizConfiguration = await this.quizConfigurationRepository.create({
      ...body,
      userId,
    });

    const questions = generatedQuiz.map((question) => ({
      id: uuidv4(),
      complexity: String(question.complexity),
      text: question.question,
      answers: question.questionAnswers,
    }));

    await this.questionRepository.createMany({
      questions: questions.map(({ complexity, text, id }) => ({
        id,
        complexity: String(complexity),
        quizConfiguration: savedQuizConfiguration,
        text,
      })),
    });

    await this.answerRepository.createMany({
      answers: questions.reduce((acc, value) => {
        acc.push(...value.answers.map(({ score, answer }) => ({ score, text: answer, questionId: value.id })));
        return acc;
      }, [] as InsertAnswer[]),
    });

    return {
      id: savedQuizConfiguration.id,
    };
  }

  findAll({
    privacy = Privacy.Private,
    page,
    take,
    userId,
  }: FindAllQuizConfigurationProps): Promise<QuizConfiguration[]> {
    return this.quizConfigurationRepository.findAll({ page, take, privacy, userId });
  }

  async findOne(id: string, userId: string): Promise<QuizConfiguration> {
    const quizConfiguration = await this.quizConfigurationRepository.findOne(id, userId);

    if (!quizConfiguration) {
      throw new LogicException(LogicExceptionType.QUIZ_CONFIGURATION_NOT_FOUND);
    }

    return quizConfiguration;
  }

  async remove(id: string, userId: string): Promise<{ result: boolean }> {
    const result = await this.quizConfigurationRepository.remove(id, userId);

    if (!result) {
      throw new LogicException(LogicExceptionType.QUIZ_CONFIGURATION_NOT_FOUND);
    }

    return {
      result,
    };
  }
}
