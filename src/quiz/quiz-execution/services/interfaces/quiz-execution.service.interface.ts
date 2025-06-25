export interface IStart {
  sessionId: string;
  quizConfigurationId: string;
  userId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface IQuizExecutionService {
  start(props: IStart): Promise<void>;
  setAnswer(
    sessionId: string,
    questionId: string,
    answer: string,
  ): Promise<void>;
  finishAnswer(sessionId: string, questionId: string): Promise<void>;
  finishQuiz(sessionId: string): Promise<void>;
}
