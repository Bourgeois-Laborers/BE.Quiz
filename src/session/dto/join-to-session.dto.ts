import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class JoinSessionDto {
  @ApiProperty({ type: String })
  @IsString()
  @MaxLength(20)
  @MinLength(2)
  userAlias: string;
}

export class JoinToSessionResponseDto {
  @ApiProperty({
    example: 'ok',
  })
  @Expose()
  result: string;
}
