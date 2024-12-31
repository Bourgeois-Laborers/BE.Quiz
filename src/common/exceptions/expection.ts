import { LogicExceptionList } from '../types/logic-exceptions.enum';

type LogicExceptionBody = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionType = {
  [key in LogicExceptionList]: LogicExceptionBody;
};

export const Exceptions: LogicExceptionType = {
  [LogicExceptionList.AUTH_INVALID_TOKEN]: {
    httpStatusCode: 401,
    message: 'Invalid token',
  },
  [LogicExceptionList.AUTH_MISSING_TOKEN]: {
    httpStatusCode: 401,
    message: 'Authorization token required',
  },
  [LogicExceptionList.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [LogicExceptionList.USER_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'User already exists',
  },
  [LogicExceptionList.SESSION_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Session not found',
  },
  [LogicExceptionList.USER_ALREADY_HAS_ACTIVE_SESSION]: {
    httpStatusCode: 400,
    message: 'User already have active session',
  },
};
