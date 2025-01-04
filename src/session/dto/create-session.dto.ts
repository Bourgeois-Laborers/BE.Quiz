import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class CreateSessionDto {
  @ApiProperty({ type: String })
  userAlias: string;
}

export class CreateSessionResponseDto {
  @ApiProperty({
    example: uuidv4(),
  })
  @Expose()
  id: string;
}
