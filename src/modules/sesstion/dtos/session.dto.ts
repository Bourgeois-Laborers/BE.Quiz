import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsDateString } from 'class-validator';

import { SessionStatus } from '../types/session-status.type';

export class SessionDto {
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
