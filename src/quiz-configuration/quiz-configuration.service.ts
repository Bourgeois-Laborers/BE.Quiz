import { v4 as uuidv4 } from 'uuid';

import { Injectable } from '@nestjs/common';

import { CreateQuizConfigurationProps } from '@quiz-configuration/interface/create-quiz-configuration.interface';

import { QuizConfigurationRepository } from '@database/repositories/quiz-configuration.repository';
import { QuestionRepository } from '@database/repositories/question.repository';
import { AnswerRepository } from '@database/repositories/answer.repository';
import { InsertAnswer } from '@database/repositories/interfaces/create-answers.interface';

import { GptService } from '@libs/gpt';

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

  findAll() {
    return `This action returns all quizConfiguration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} quizConfiguration`;
  }

  remove(id: number) {
    return `This action removes a #${id} quizConfiguration`;
  }
}
