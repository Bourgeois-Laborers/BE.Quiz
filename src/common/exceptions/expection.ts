import { LogicExceptionList } from '../types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionType = {
  [key in LogicExceptionList]: LogicExceptionBody;
};

export const Exceptions: LogicExceptionType = {
  [LogicExceptionList.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [LogicExceptionList.SESSION_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Session not found',
  }
};
