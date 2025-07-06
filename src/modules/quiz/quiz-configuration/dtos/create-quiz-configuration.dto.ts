import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateQuizConfigurationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  prompt: string;

  @ApiProperty()
  @IsNumber()
  questionsCount: number;

  @ApiProperty({
    description: 'Whether the quiz is private',
    default: false,
  })
  @IsBoolean()
  isPrivate: boolean;
}

export class CreateQuizConfigurationResponseDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;

  @ApiProperty()
  prompt: string;

  @ApiProperty()
  questionsCount: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isPrivate: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
