import { LogicExceptionList } from '../types/logic-exceptions.enum';

export class LogicException extends Error {
  constructor(public error: LogicExceptionList) {
    super(error);
  }
}
