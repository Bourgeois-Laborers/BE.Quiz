import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';

import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';
import { AuthGuard } from '@auth/auth.guard';

type Guards = 'AuthGuard';

const ALLOWED_GUADS = { AuthGuard: AuthGuard };

export function ControllerComposeDecorator({ guards }: { guards: Guards[] }) {
  const includeGuards = guards.map((guard) => ALLOWED_GUADS[guard]).filter(value => value);
  
  if (includeGuards.length) {
    return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor), UseGuards(...includeGuards));
  }

  return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor));
}
