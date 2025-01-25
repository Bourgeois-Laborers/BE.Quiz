import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export interface Pagination {
  page: number;
  take: number;
}

export class PaginationDto implements Pagination {
  @ApiProperty()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  take: number;
}
