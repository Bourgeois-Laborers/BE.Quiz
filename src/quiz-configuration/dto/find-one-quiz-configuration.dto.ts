import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Privacy } from '@database/entities/quiz-configuration.entity';

export class FindOneQuizConfigurationResponse {
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

export class FindOneQuizConfigurationResponseDto {
  @ApiProperty()
  data: FindOneQuizConfigurationResponse;
}
