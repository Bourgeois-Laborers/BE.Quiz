import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { ITokenUser } from '@/modules/auth/interfaces/token-user.interface';

interface RequestWithUser {
  data: {
    user: ITokenUser;
  };
}

export const WsUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const client = ctx.switchToWs().getClient<RequestWithUser>();

    if (!client.data?.user) {
      throw new WsException('User not found in request');
    }

    return client.data.user;
  },
);
