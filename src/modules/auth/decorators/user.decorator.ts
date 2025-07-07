import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ITokenPayload } from '../services/interfaces/auth.interface';

interface RequestWithUser {
  user: ITokenPayload;
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
