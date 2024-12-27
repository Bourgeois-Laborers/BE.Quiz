import { applyDecorators, UseGuards, UseInterceptors } from '@nestjs/common';

import { ErrorsInterceptor } from '@common/incerceptors/errors.interceptor';
import { ResponseInterceptor } from '@common/incerceptors/response.interceptor';
import { AuthGuard } from '@auth/auth.guard';

type Guards = 'AuthGuard';

const ALLOWED_GUADS = { AuthGuard: AuthGuard };

export function ControllerComposeDecorator({ guards }: { guards: Guards[] }) {
  const includeGuards = guards.map((guard) => ALLOWED_GUADS[guard]).filter(value => value);
  console.log("🚀 ~ ControllerComposeDecorator ~ includeGuards:", includeGuards, guards,)
  

  if (includeGuards.length) {
    console.log("🚀 ~ ControllerComposeDecorator ~ includeGuards:", includeGuards)
    return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor), UseGuards(...includeGuards));
  }

  return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor));
}
