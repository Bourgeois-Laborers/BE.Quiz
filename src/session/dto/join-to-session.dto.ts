import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JoinSessionDto {
  @ApiProperty({ type: String })
  userAlias: string;
}

export class JoinToSessionResponseDto {
  @ApiProperty({
    example: 'ok',
  })
  @Expose()
  result: string;
}
