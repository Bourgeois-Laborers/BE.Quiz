import { LogicExceptionType } from '../types/logic-exception-type.enum';

type LogicExceptionData = {
  httpStatusCode: number;
  message: string;
};

type LogicExceptionMap = {
  [key in LogicExceptionType]: LogicExceptionData;
};

export const Exceptions: LogicExceptionMap = {
  [LogicExceptionType.AUTH_INVALID_TOKEN]: {
    httpStatusCode: 401,
    message: 'Invalid token',
  },
  [LogicExceptionType.AUTH_MISSING_TOKEN]: {
    httpStatusCode: 401,
    message: 'Authorization token required',
  },
  [LogicExceptionType.USER_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'User not found',
  },
  [LogicExceptionType.USER_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'User already exists',
  },
  [LogicExceptionType.SESSION_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Session not found',
  },
  [LogicExceptionType.USER_ALREADY_HAS_ACTIVE_SESSION]: {
    httpStatusCode: 400,
    message: 'User already have active session',
  },
  [LogicExceptionType.SESSION_USER_ALIAS_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'User alias in session already exists',
  },
  [LogicExceptionType.QUIZ_CONFIGURATION_NOT_FOUND]: {
    httpStatusCode: 404,
    message: 'Quiz configuration not found',
  },
  [LogicExceptionType.QUIZ_CONFIGURATION_ALREADY_EXISTS]: {
    httpStatusCode: 400,
    message: 'Quiz configuration already exists',
  },
};
