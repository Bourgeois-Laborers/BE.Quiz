import { UseInterceptors } from '@nestjs/common';

import { TransformConditionalInterceptor } from '@/common/interceptors/transform-conditional.interceptor';

export const TransformConditional = <T>(
  dtoClass: new () => T,
  condition?: (data: any) => boolean,
) => UseInterceptors(new TransformConditionalInterceptor(dtoClass, condition));
