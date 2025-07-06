import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString } from 'class-validator';

import { SessionStatus } from '../types/session-status.type';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  userAlias: string;
}

export class CreateSessionResponseDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsEnum(SessionStatus)
  status: SessionStatus;

  @ApiProperty()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  updatedAt: Date;
}
