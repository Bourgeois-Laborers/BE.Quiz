import { LogicExceptionList } from '../types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

export const Exceptions: Record<LogicExceptionList, LogicExceptionBody> = {
  [LogicExceptionList.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [LogicExceptionList.SESSION_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Session not found',
  },
  [LogicExceptionList.USER_ALREADY_HAS_ACTIVE_SESSION]: {
    httpStatusCode: 400,
    message: 'User already have active session',
  }
};
