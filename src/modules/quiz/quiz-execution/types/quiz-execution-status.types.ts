import { QuizExecutionStatus } from '@app/prisma';

export const availableNextStatuses = {
  [QuizExecutionStatus.PENDING]: [
    QuizExecutionStatus.CANCELED,
    QuizExecutionStatus.EXECUTING,
  ],
  [QuizExecutionStatus.EXECUTING]: [
    QuizExecutionStatus.CANCELED,
    QuizExecutionStatus.PAUSED,
    QuizExecutionStatus.COMPLETED,
  ],
  [QuizExecutionStatus.PAUSED]: [
    QuizExecutionStatus.EXECUTING,
    QuizExecutionStatus.CANCELED,
  ],
  [QuizExecutionStatus.COMPLETED]: [],
  [QuizExecutionStatus.CANCELED]: [],
};

export const getAvailableNextStatuses = (
  status: QuizExecutionStatus,
): QuizExecutionStatus[] => {
  return availableNextStatuses[status];
};
