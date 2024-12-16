import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ErrorsInterceptor } from '@common/incerceptors/errors.interceptor';

import { ResponseInterceptor } from '../incerceptors/response.interceptor';

export function ControllerComposeDecorator() {
  return applyDecorators(UseInterceptors(ErrorsInterceptor, ResponseInterceptor));
}
