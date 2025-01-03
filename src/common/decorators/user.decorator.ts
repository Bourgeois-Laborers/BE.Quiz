import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { AuthorizedUser } from '@common/interfaces/user.inteface';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ user: AuthorizedUser }>();

  return request.user;
});
