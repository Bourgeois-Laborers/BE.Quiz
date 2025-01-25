import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ApiCreatedResponse {
  @ApiProperty({
    example: {
      id: 'string',
    },
  })
  public data: {
    id: string;
  };
}

export class CreatedResponseDto {
  @Expose()
  public id: string;
}
