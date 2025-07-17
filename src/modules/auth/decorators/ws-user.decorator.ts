import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

interface RequestWithUser {
  data: {
    user: ITokenPayload;
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
