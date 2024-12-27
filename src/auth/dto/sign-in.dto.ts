import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ type: String })
  id: string;
}
