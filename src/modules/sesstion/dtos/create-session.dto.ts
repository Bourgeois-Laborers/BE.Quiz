import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { SessionStatus } from '@/modules/sesstion/types/session-status.type';

export class CreateSessionDto {
  @ApiProperty()
  @IsString()
  userAlias: string;
}

export class CreateSessionResponseDto {
  @ApiProperty({
    description: 'The ID of the session',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'The status of the session',
    enum: SessionStatus,
    example: SessionStatus.OPEN,
  })
  @Expose()
  status: SessionStatus;

  @ApiProperty({
    description: 'The date and time the session was created',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time the session was updated',
    example: '2021-01-01T00:00:00.000Z',
  })
  @Expose()
  updatedAt: Date;
}
