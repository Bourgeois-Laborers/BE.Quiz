import { SortOrder } from '@common/types/sort-order.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetQuizConfigurationsDto {
  @ApiProperty({ required: false, default: 1 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Expose()
  page: number;

  @ApiProperty({ required: false, default: 10 })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Expose()
  pageSize: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @Expose()
  search: string;

  @ApiProperty({ required: false, default: 'name' })
  @IsString()
  @IsOptional()
  @Expose()
  sortBy: string;

  @ApiProperty({ enum: SortOrder, default: SortOrder.ASC })
  @IsEnum(SortOrder)
  @Expose()
  sortOrder: SortOrder;
}
