import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionType } from '@common/types/logic-exception-type.enum';
import { AuthorizedUser } from '@common/interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string>; user?: AuthorizedUser }>();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new LogicException(LogicExceptionType.AUTH_MISSING_TOKEN);
    }

    const [, token] = authorization.split(' ');

    try {
      const payload = await this.jwtService.verifyAsync<AuthorizedUser>(token);
      request.user = payload;
    } catch {
      throw new LogicException(LogicExceptionType.AUTH_INVALID_TOKEN);
    }

    return true;
  }
}
