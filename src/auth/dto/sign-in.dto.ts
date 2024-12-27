import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInDto {
  @ApiProperty({ type: String })
  id: string;
}

export class SignInResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  accessToken: string;
}
