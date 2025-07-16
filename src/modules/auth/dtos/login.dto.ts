import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  userId: string;
}

export class LoginResponseDto {
  @ApiProperty()
  @IsString()
  id: string;
}
