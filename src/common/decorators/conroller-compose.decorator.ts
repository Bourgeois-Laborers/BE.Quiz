import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';

import { ErrorsInterceptor } from '@common/incerceptors/errors.interceptor';
import { ResponseInterceptor } from '@common/incerceptors/response.interceptor';
import { AuthGuard } from '@auth/auth.guard';

type Guards = 'AuthGuard';

const ALLOWED_GUADS = { AUTH_GUARD: AuthGuard };

export function ControllerComposeDecorator({ guards }: { guards: Guards[] }) {
  const includeGuards: any = guards.map((guard) => ALLOWED_GUADS[guard]);

  return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor), UseGuards(includeGuards));
}
