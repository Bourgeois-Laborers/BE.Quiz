import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';

import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

import { AuthGuard } from '@auth/auth.guard';

type Guards = 'AuthGuard';

const ALLOWED_GUARDS = { AuthGuard: AuthGuard };

export function ControllerComposeDecorator({ guards }: { guards: Guards[] }): MethodDecorator {
  const includeGuards = guards.map((guard) => ALLOWED_GUARDS[guard]).filter((value) => value);

  if (includeGuards.length) {
    return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor), UseGuards(...includeGuards));
  }
  return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor));
}
