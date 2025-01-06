import { LogicExceptionType } from '../types/logic-exception-type.enum';

export class LogicException extends Error {
  constructor(public error: LogicExceptionType) {
    super(error);
  }
}
