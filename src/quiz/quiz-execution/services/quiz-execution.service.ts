import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuizQuestionService } from '@quiz/quiz-question/services/quiz-question.service';
import { SessionToUserService } from '@quiz/sesstion/services/session-to-user.service';
import { Queue } from 'bullmq';

import {
  IFinishQuestion,
  IGetCurrentQuestion,
  IQuizExecutionService,
  IStart,
  IStartQuestion,
  IStartQuestionResult,
} from './interfaces/quiz-execution.service.interface';
import { QuizExecutionCacheService } from '../cache/cache.service';
import { QuizExecutionRepository } from '../repositories/quiz-execution.repository';
import { QueueNames, QuizExecutionJobNames } from '../types/queue.types';
import { Status } from '../types/status.types';

@Injectable()
export class QuizExecutionService implements IQuizExecutionService {
  constructor(
    private readonly quizExecutionRepository: QuizExecutionRepository,
    private readonly sessionToUserService: SessionToUserService,
    private readonly cacheService: QuizExecutionCacheService,
    private readonly quizQuestionService: QuizQuestionService,
    @InjectQueue(QueueNames.QUIZ_EXECUTION)
    private readonly quizExecutionQueue: Queue, // Replace 'any' with the actual type if available
  ) {}

  async start({
    sessionId,
    quizConfigurationId,
    shareAnswers,
    timePerQuestion,
  }: IStart) {
    const quizExecution = await this.quizExecutionRepository.startQuiz({
      sessionId,
      quizConfigurationId,
      shareAnswers,
      timePerQuestion,
    });

    await this.cacheService.setupQuizExecution({
      quizExecutionId: quizExecution.id,
      sessionId,
      shareAnswers,
      timePerQuestion,
    });

    return {
      quizExecutionId: quizExecution.id,
      status: Status.EXECUTING,
      shareAnswers: quizExecution.shareAnswers,
      timePerQuestion: quizExecution.timePerQuestion,
    };
  }

  async startQuestion({
    quizExecutionId,
    sessionId,
  }: IStartQuestion): Promise<IStartQuestionResult> {
    const getQuizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!getQuizExecutionState) {
      throw new BadRequestException(
        'Quiz execution state not found, first start quiz',
      );
    }

    const quizExecution =
      await this.quizExecutionRepository.getQuizExecution(quizExecutionId);

    if (!quizExecution) {
      throw new BadRequestException('Quiz session not found');
    }

    const quizQuestions = await this.quizQuestionService.getQuestions(
      quizExecution.quizConfigurationId,
    );

    const questionsToStart = quizQuestions.filter(
      (question) =>
        !getQuizExecutionState.questionsState[question.id] ||
        !getQuizExecutionState.questionsState[question.id].finishedAt,
    );

    const randomQuestionIndex = Math.floor(
      Math.random() * questionsToStart.length,
    );

    const randomQuestion = questionsToStart[randomQuestionIndex];

    await this.cacheService.startQuestion({
      questionId: randomQuestion.id,
      quizExecutionId,
      sessionId,
      startedAt: new Date(),
    });

    const finishedAt = new Date(
      new Date().getTime() + getQuizExecutionState.timePerQuestion * 1000,
    );

    await this.quizExecutionQueue.add(
      QuizExecutionJobNames.FINISH_QUESTION,
      {
        questionId: randomQuestion.id,
        quizExecutionId,
        sessionId,
        finishedAt,
      },
      {
        delay: getQuizExecutionState.timePerQuestion * 1000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    return {
      question: randomQuestion,
      finishedAt: finishedAt,
      startedAt: new Date(),
    };
  }

  async setAnswer(
    quizExecutionId: string,
    questionId: string,
    answerId: string,
    userId: string,
  ) {
    const checkIsUserAnswered =
      await this.quizExecutionRepository.checkIsUserAnswered({
        questionId,
        quizExecutionId,
        userId,
      });

    if (checkIsUserAnswered) {
      throw new BadRequestException('User already answered on this question');
    }

    const answer = await this.quizExecutionRepository.setAnswer({
      userId,
      answerId,
      questionId,
      quizExecutionId,
    });

    if (!answer) {
      throw new InternalServerErrorException(
        'Answer cannot be created, please, try again',
      );
    }
  }

  async finishQuiz({ quizExecutionId, sessionId }: IFinishQuestion) {
    await this.quizExecutionRepository.finishQuiz(quizExecutionId);

    await this.cacheService.finishQuiz(sessionId, quizExecutionId);

    return { status: Status.COMPLETED };
  }

  async getCurrentQuestion({
    quizExecutionId,
    sessionId,
  }: IGetCurrentQuestion) {
    const quizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!quizExecutionState) {
      throw new BadRequestException('Quiz execution state not found');
    }

    console.log('quizExecutionState', quizExecutionState);

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (!currentQuestion) {
      throw new BadRequestException('Current question not found');
    }

    const [questionId, currentQuestionState] = currentQuestion;

    const estimatedFinishedAt = new Date(
      new Date(currentQuestionState.startedAt).getTime() +
        quizExecutionState.timePerQuestion * 1000,
    );

    const question = await this.quizQuestionService.getQuestion(
      quizExecutionState.quizConfigurationId,
      questionId,
    );

    if (!question) {
      throw new InternalServerErrorException('Question not found');
    }

    return {
      question,
      startedAt: currentQuestionState.startedAt,
      finishedAt: estimatedFinishedAt ?? currentQuestionState.finishedAt,
    };
  }
}
