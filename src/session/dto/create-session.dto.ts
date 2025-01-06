import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class CreateSessionDto {
  @ApiProperty({ type: String })
  @IsString()
  @MaxLength(20)
  @MinLength(2)
  userAlias: string;
}

export class CreateSessionResponseDto {
  @ApiProperty({
    example: uuidv4(),
  })
  @Expose()
  id: string;
}
