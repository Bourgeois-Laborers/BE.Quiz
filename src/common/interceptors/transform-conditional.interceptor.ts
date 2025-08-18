import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class TransformConditionalInterceptor<T>
  implements NestInterceptor<T, T>
{
  constructor(
    private readonly dtoClass: new () => T,
    private readonly condition?: (data: any) => boolean,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T> {
    return next.handle().pipe(
      map((data: unknown): T => {
        if (this.condition && !this.condition(data)) {
          return data as T;
        }

        if (Array.isArray(data)) {
          return data.map((item) =>
            plainToClass(this.dtoClass, item, {
              excludeExtraneousValues: true,
            }),
          ) as unknown as T;
        }
        return plainToClass(this.dtoClass, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
