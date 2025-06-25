export interface IStart {
  sessionId: string;
  quizConfigurationId: string;
  shareAnswers: boolean;
  timePerQuestion: number;
}

export interface IQuizExecutionRepository {
  startQuiz(props: IStart): Promise<void>;
}
