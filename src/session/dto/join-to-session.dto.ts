import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JoinToSessionResponseDto {
  @ApiProperty({
    example: 'ok',
  })
  @Expose()
  result: string;
}
