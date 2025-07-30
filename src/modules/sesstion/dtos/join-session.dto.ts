import { IsString, IsUUID } from 'class-validator';

export class JoinSessionDto {
  @IsString()
  @IsUUID()
  sessionId: string;
}
