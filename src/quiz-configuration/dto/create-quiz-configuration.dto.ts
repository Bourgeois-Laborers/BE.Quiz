import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { Privacy } from '@database/entities/quiz-configuration.entity';

export class CreateQuizConfigurationDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty()
  public name: string;

  @IsString()
  @ApiProperty()
  prompt: string;

  @IsInt()
  @Min(5)
  @Max(100)
  @ApiProperty()
  questionsCount: number;

  @IsEnum(Privacy)
  @ApiProperty({ enum: Privacy })
  public privacy: Privacy;
}
