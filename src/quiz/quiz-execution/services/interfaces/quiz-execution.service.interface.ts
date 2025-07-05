import { Status } from '@quiz/quiz-execution/types/status.types';
import { IQuestion } from '@quiz/quiz-question/repositories/interfaces/question.repository.interface';

export interface IStart {
  sessionId: string;
  quizConfigurationId: string;
  userId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface IStartResult {
  quizExecutionId: string;
  status: Status;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface IStartQuestion {
  sessionId: string;
  quizExecutionId: string;
  userId: string;
}

export interface IFinishQuestion {
  sessionId: string;
  quizExecutionId: string;
  userId: string;
}

export interface IGetCurrentQuestion {
  sessionId: string;
  quizExecutionId: string;
  userId: string;
}

export interface IQuizExecutionService {
  start(props: IStart): Promise<IStartResult>;
  setAnswer(
    sessionId: string,
    questionId: string,
    answerId: string,
    userId: string,
    quizExecutionId: string,
  ): Promise<void>;
  startQuestion(props: IStartQuestion): Promise<void>;
  getCurrentQuestion(
    props: IGetCurrentQuestion,
  ): Promise<{ question: IQuestion; startedAt: Date; finishedAt: Date } | null>;
}
