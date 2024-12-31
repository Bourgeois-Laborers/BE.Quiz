import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;
}

export class SignInResponseDto {
  @ApiProperty({ type: String })
  @Expose()
  accessToken: string;
}
