export interface IQuizExecutionResult {
  userId: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  questionId: string;
  quizExecutionId: string;
  answerId: string;
}

export interface ISetAnswer {
  userId: string;
  questionId: string;
  quizExecutionId: string;
  answerId: string;
}

export interface IQuizExecutionResultRepository {
  setAnswer(dto: ISetAnswer): Promise<IQuizExecutionResult>;
}
