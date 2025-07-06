export interface IFinishQuestionJob {
  questionId: string;
  quizExecutionId: string;
  sessionId: string;
  finishedAt: string;
  isLast: boolean;
}
