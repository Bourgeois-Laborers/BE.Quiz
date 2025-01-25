import { Privacy } from '@database/entities/quiz-configuration.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

import { PaginationDto } from '@common/base/pagination.base';

export class FindAllQuizConfigurationDto extends PaginationDto {
  @ApiProperty({ enum: Privacy })
  @IsEnum(Privacy)
  @IsOptional()
  privacy: Privacy;
}

export class FindAllQuizConfigurationResponse {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose()
  @ApiProperty()
  prompt: string;

  @Expose()
  @ApiProperty()
  questionsCount: number;

  @Expose()
  @ApiProperty({ enum: Privacy })
  privacy: Privacy;
}

export class FindAllQuizConfigurationResponseDto {
  @ApiProperty({
    isArray: true,
  })
  data: FindAllQuizConfigurationResponse;
}
