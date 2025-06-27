import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
