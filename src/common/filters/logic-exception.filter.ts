import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';

import { LogicException } from '../exceptions/logic-exception';
import { Exceptions } from '../exceptions/expection';

@Catch(LogicException)
export class LogicExceptionFilter implements ExceptionFilter {
  catch(exception: LogicException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const expInfo = Exceptions[exception.error];
    const status = expInfo.httpStatusCode;
    const message = expInfo.message;

    response.status(status).json({
      statusCode: status,
      stringCode: exception.error,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
