import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuizQuestionService } from '@quiz/quiz-question/services/quiz-question.service';
import { SessionToUserService } from '@quiz/sesstion/services/session-to-user.service';

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
import { Status } from '../types/status.types';

@Injectable()
export class QuizExecutionService implements IQuizExecutionService {
  constructor(
    private readonly quizExecutionRepository: QuizExecutionRepository,
    private readonly sessionToUserService: SessionToUserService,
    private readonly cacheService: QuizExecutionCacheService,
    private readonly quizQuestionService: QuizQuestionService,
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
    });
  }

  async startQuestion({
    quizExecutionId,
    sessionId,
    userId,
  }: IStartQuestion): Promise<IStartQuestionResult> {
    const isUserHost = await this.sessionToUserService.checkIsUserAlreadyJoined(
      { userId, sessionId, isHost: true },
    );

    if (!isUserHost) {
      throw new ForbiddenException('User have no rules to start session');
    }

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

    setTimeout(() => {
      void (async () => {
        await this.cacheService.finishQuestion({
          questionId: randomQuestion.id,
          quizExecutionId,
          sessionId,
          finishedAt,
        });
      })();
    }, getQuizExecutionState.timePerQuestion * 1000);

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

  async finishQuiz({ quizExecutionId, sessionId, userId }: IFinishQuestion) {
    const isUserHost = await this.sessionToUserService.checkIsUserAlreadyJoined(
      { userId, sessionId, isHost: true },
    );

    if (!isUserHost) {
      throw new ForbiddenException('User have no rules to finish quiz');
    }

    await this.quizExecutionRepository.finishQuiz(quizExecutionId);

    await this.cacheService.finishQuiz(sessionId, quizExecutionId);

    return { status: Status.COMPLETED };
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

    const currentQuestion = Object.entries(
      quizExecutionState.questionsState,
    ).find(([, question]) => !question.finishedAt);

    if (!currentQuestion) {
      throw new BadRequestException('Current question not found');
    }

    const [questionId, currentQuestionState] = currentQuestion;

    const estimatedFinishedAt = new Date(
      new Date().getTime() + quizExecutionState.timePerQuestion * 1000,
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
