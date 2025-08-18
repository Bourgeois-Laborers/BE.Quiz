import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
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
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  prompt: string;

  @ApiProperty()
  @Expose()
  questionsCount: number;

  @ApiProperty()
  @Expose()
  userId: string;

  @ApiProperty()
  @Expose()
  isPrivate: boolean;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;
}
