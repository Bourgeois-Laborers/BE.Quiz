import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RemoveQuizConfigurationResponse {
  @Expose()
  @ApiProperty()
  result: boolean;
}

export class RemoveQuizConfigurationResponseDto {
  @ApiProperty()
  data: RemoveQuizConfigurationResponse;
}
