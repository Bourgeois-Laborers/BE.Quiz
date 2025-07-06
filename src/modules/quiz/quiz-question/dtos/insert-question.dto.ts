import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InsertQuestionDto {
  @ApiProperty()
  @IsString()
  prompt: string;
}
