import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsDateString } from 'class-validator';

export class SessionToUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  userAlias: string;

  @ApiProperty()
  @IsBoolean()
  isHost: boolean;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
