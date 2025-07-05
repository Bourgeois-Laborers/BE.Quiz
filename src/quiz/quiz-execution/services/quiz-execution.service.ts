import { InjectQueue } from '@nestjs/bullmq';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuizQuestionService } from '@quiz/quiz-question/services/quiz-question.service';
import { SessionToUserService } from '@quiz/sesstion/services/session-to-user.service';
import { Queue } from 'bullmq';

import {
  IGetCurrentQuestion,
  IQuizExecutionService,
  IStart,
  IStartQuestion,
} from './interfaces/quiz-execution.service.interface';
import { QuizExecutionCacheService } from '../cache/cache.service';
import { QuizExecutionRepository } from '../repositories/quiz-execution.repository';
import { QueueNames, QuizExecutionJobNames } from '../types/queue.types';
import { getAvailableNextStatuses, Status } from '../types/status.types';

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
    userId,
    sessionId,
    quizConfigurationId,
    shareAnswers,
    timePerQuestion,
  }: IStart) {
    const isUserHost = await this.sessionToUserService.checkIsUserAlreadyJoined(
      { userId, sessionId, isHost: true },
    );

    if (!isUserHost) {
      throw new ForbiddenException('User have no rules to start session');
    }

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
      status: Status.EXECUTING,
    });

    return {
      quizExecutionId: quizExecution.id,
      status: Status.EXECUTING,
      shareAnswers: quizExecution.shareAnswers,
      timePerQuestion: quizExecution.timePerQuestion,
    };
  }

  async startQuestion({ quizExecutionId, sessionId, userId }: IStartQuestion) {
    const isUserHost = await this.sessionToUserService.checkIsUserAlreadyJoined(
      { userId, sessionId, isHost: true },
    );

    if (!isUserHost) {
      throw new ForbiddenException('User have no rules to start session');
    }

    const quizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!quizExecutionState) {
      throw new BadRequestException(
        'Quiz execution state not found, first start quiz',
      );
    }

    if (quizExecutionState.status !== Status.EXECUTING) {
      throw new BadRequestException('Quiz execution already finished');
    }

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (currentQuestion) {
      throw new BadRequestException('Current question is not finished');
    }

    const quizQuestions = await this.quizQuestionService.getQuestions(
      quizExecutionState.quizConfigurationId,
    );

    const questionsToStart = quizQuestions.filter(
      (question) =>
        !quizExecutionState.questionsState[question.id] ||
        !quizExecutionState.questionsState[question.id].finishedAt,
    );

    if (questionsToStart.length === 0) {
      throw new BadRequestException('No questions to start');
    }

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
      new Date().getTime() + quizExecutionState.timePerQuestion * 1000,
    );

    await this.quizExecutionQueue.add(
      QuizExecutionJobNames.FINISH_QUESTION,
      {
        questionId: randomQuestion.id,
        quizExecutionId,
        sessionId,
        finishedAt,
        isLast: questionsToStart.length === 1,
      },
      {
        delay: quizExecutionState.timePerQuestion * 1000,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );
  }

  async setAnswer(
    quizExecutionId: string,
    questionId: string,
    answerId: string,
    userId: string,
    sessionId: string,
  ) {
    const isUserJoined =
      await this.sessionToUserService.checkIsUserAlreadyJoined({
        userId,
        sessionId,
      });

    if (!isUserJoined) {
      throw new ForbiddenException('User not joined to this session');
    }

    const checkIsUserAnswered =
      await this.quizExecutionRepository.checkIsUserAnswered({
        questionId,
        quizExecutionId,
        userId,
      });

    if (checkIsUserAnswered) {
      throw new BadRequestException('User already answered on this question');
    }

    const quizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!quizExecutionState) {
      throw new InternalServerErrorException('Quiz execution state not found');
    }

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (!currentQuestion || currentQuestion[0] !== questionId) {
      throw new BadRequestException('Current question is not started');
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

  async getCurrentQuestion({
    quizExecutionId,
    userId,
    sessionId,
  }: IGetCurrentQuestion) {
    const isUserJoined =
      await this.sessionToUserService.checkIsUserAlreadyJoined({
        userId,
        sessionId,
      });

    if (!isUserJoined) {
      throw new ForbiddenException('User not joined to this session');
    }

    const quizExecutionState = await this.cacheService.getQuizExecution(
      sessionId,
      quizExecutionId,
    );

    if (!quizExecutionState) {
      throw new BadRequestException('Quiz execution state not found');
    }

    if (quizExecutionState.status !== Status.EXECUTING) {
      throw new BadRequestException('Quiz execution already finished');
    }

    console.log('quizExecutionState', quizExecutionState);

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (!currentQuestion) {
      return null;
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

  public async updateQuizExecutionStatus(
    quizExecutionId: string,
    status: Status,
    userId?: string,
  ) {
    const quizExecution = await this.quizExecutionRepository.getQuizExecution(
      quizExecutionId,
      userId,
    );

    if (!quizExecution) {
      throw new BadRequestException('Quiz execution not found');
    }

    if (
      !getAvailableNextStatuses(quizExecution.status as Status).includes(status)
    ) {
      throw new BadRequestException('Invalid status provided');
    }

    return this.quizExecutionRepository.updateQuizExecutionStatus(
      quizExecutionId,
      status,
    );
  }
}
