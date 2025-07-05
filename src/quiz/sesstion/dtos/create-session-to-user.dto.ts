import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSessionToUserDto {
  @ApiProperty()
  @IsString()
  userAlias: string;
}
