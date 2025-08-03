import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext): unknown => {
    const request = ctx
      .switchToHttp()
      .getRequest<{ cookies?: Record<string, unknown> }>();
    if (!request.cookies) {
      return undefined;
    }
    return data ? request.cookies[data] : request.cookies;
  },
);
