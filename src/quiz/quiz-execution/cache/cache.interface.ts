export interface ISetupQuizExecution {
  sessionId: string;
  quizExecutionId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface IQuizExecutionState {
  sessionId: string;
  quizExecutionId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
  quizConfigurationId: string;
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
  finishedAt: Date;
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
