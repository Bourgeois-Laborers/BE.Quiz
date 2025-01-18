import { Privacy } from '@database/entities/quiz-configuration.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { PaginationDto } from '@common/base/pagination.base';

export class FindAllQuizConfigurationDto extends PaginationDto {
  @ApiProperty({ enum: Privacy })
  @IsEnum(Privacy)
  @IsOptional()
  privacy: Privacy;
}
