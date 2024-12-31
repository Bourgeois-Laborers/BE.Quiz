import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new LogicException(LogicExceptionList.AUTH_MISSING_TOKEN);
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = this.jwtService.verify(token);
      request.user = payload;
    } catch (error) {
      throw new LogicException(LogicExceptionList.AUTH_INVALID_TOKEN);
    }

    return true;
  }
}
