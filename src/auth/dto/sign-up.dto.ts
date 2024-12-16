import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    type: String,
    description: 'Unique username',
  })
  username: string;
}
