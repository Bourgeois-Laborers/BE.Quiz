export interface IStart {
  sessionId: string;
  quizConfigurationId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface ICheckIsUserAnswered {
  userId: string;
  quizExecutionId: string;
  questionId: string;
}

export interface ISetAnswer {
  userId: string;
  quizExecutionId: string;
  questionId: string;
  answerId: string;
}

export interface IQuizExecutionRepository {
  startQuiz(props: IStart): Promise<void>;
  checkIsUserAnswered(props: ICheckIsUserAnswered): Promise<boolean>;
  setAnswer(props: ISetAnswer): Promise<void>;
  getQuizExecution(quizExecutionId: string);
}
