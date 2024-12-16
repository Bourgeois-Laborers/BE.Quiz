import { ClassContrustor, SerializeInterceptor } from '@common/incerceptors/serializer.interceptor';
import { UseInterceptors } from '@nestjs/common';
 
export function Serialize(dto: ClassContrustor): MethodDecorator & ClassDecorator {
  return UseInterceptors(new SerializeInterceptor(dto));
}