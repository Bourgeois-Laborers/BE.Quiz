import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RefreshTokenDto {
  @ApiProperty({ type: String })
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  accessToken: string;

  @ApiProperty({ type: String })
  @Expose()
  refreshToken: string;
}
