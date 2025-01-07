import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LeaveFromSessionResponseDto {
  @ApiProperty({
    example: 'ok',
  })
  @Expose()
  result: string;
}
