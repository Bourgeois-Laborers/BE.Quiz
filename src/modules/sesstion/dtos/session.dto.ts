import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsEnum, IsDateString } from 'class-validator';

import { SessionStatus } from '@/modules/sesstion/types/session-status.type';

export class SessionDto {
  @ApiProperty()
  @IsString()
  @Expose()
  id: string;

  @ApiProperty()
  @IsEnum(SessionStatus)
  @Expose()
  status: SessionStatus;

  @ApiProperty()
  @IsDateString()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @IsDateString()
  @Expose()
  updatedAt: Date;
}
