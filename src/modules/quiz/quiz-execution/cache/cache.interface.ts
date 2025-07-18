import { QuizExecutionStatus } from '@app/prisma';

export interface ISetupQuizExecution {
  sessionId: string;
  quizExecutionId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
  status: QuizExecutionStatus;
  quizConfigurationId: string;
}

export interface IQuizExecutionState {
  sessionId: string;
  quizExecutionId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
  quizConfigurationId: string;
  status: QuizExecutionStatus;
  questionsState: {
    [questionId: string]: {
      startedAt: Date;
      finishedAt: Date;
    };
  };
}

export interface IStartQuestion {
  sessionId: string;
  quizExecutionId: string;
  questionId: string;
  startedAt: Date;
}

export interface IFinishQuestion {
  sessionId: string;
  quizExecutionId: string;
  questionId: string;
  finishedAt: string;
}

export interface IQuizExecutionCacheServiceCacheService {
  setupQuizExecution(dto: ISetupQuizExecution): Promise<void>;
  getQuizExecution(
    sessionId: string,
    quizExecutionId: string,
  ): Promise<IQuizExecutionState | null>;
  startQuestion({
    questionId,
    quizExecutionId,
    sessionId,
    startedAt,
  }: IStartQuestion): Promise<void>;
  finishQuestion({
    finishedAt,
    questionId,
    quizExecutionId,
    sessionId,
  }: IFinishQuestion): Promise<void>;
  finishQuiz(sessionId: string, quizExecutionId: string): Promise<void>;
}
