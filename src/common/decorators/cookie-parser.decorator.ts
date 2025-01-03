import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookie = createParamDecorator((cookieName: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<{ cookies: Record<string, string> }>();
  return request.cookies[cookieName];
});
