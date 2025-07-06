import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ITokenUser } from '../interfaces/token-user.interface';

interface RequestWithUser {
  user: ITokenUser;
}

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new Error('User not found in request');
    }

    return request.user;
  },
);
