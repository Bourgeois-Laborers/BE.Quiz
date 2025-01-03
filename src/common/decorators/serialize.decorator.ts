import { ClassConstructor, SerializeInterceptor } from '@common/interceptors/serializer.interceptor';
import { UseInterceptors } from '@nestjs/common';

export function Serialize(dto: ClassConstructor): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}
