import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ type: String })
  username: string;
}
