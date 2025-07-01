import { IQuizExecutionResult } from '@quiz/quiz-execution/repositories/interfaces/quiz-execution-result.repository.interface';

export interface ISetAnswer {
  userId: string;
  questionId: string;
  quizExecutionId: string;
  answerId: string;
  sessionId: string;
}

export interface IQuizExecutionResultService {
  setAnswer(dto: ISetAnswer): Promise<IQuizExecutionResult>;
}
