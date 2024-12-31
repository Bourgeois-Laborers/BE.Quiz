import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshTokenResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  accessToken: string;
}
