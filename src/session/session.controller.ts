import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { Serialize } from '@common/decorators/serialize.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';

import { SessionService } from './session.service';
import { CreateSessionResponseDto } from './dto/create-session.dto';
import { JoinToSessionResponseDto } from './dto/join-to-session';

@Controller('sessions')
@ControllerComposeDecorator()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Serialize(CreateSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateSessionResponseDto })
  public create() {
    return this.sessionService.create({ userId: 'ebc27727-5fdb-402d-a543-a0394cb42fe8' });
  }

  @Post(':sessionId/join')
  @Serialize(JoinToSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: JoinToSessionResponseDto })
  public join(@Param('sessionId') sessionId: string) {
    return this.sessionService.joinToSession({ sessionId, userId: 'ebc27727-5fdb-402d-a543-a0394cb42fe8' });
  }
}
