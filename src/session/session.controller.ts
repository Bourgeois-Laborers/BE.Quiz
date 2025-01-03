import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';
import { Serialize } from '@common/decorators/serialize.decorator';
import { User } from '@common/decorators/user.decorator';

import { AuthorizedUser } from '@common/interfaces/user.inteface';

import { SessionService } from './session.service';
import { CreateSessionResponseDto } from './dto/create-session.dto';
import { JoinToSessionResponseDto } from './dto/join-to-session.dto';

@Controller('sessions')
@ControllerComposeDecorator({ guards: ['AuthGuard'] })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Serialize(CreateSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateSessionResponseDto })
  public create(@User() user: AuthorizedUser): Promise<{ id: string }> {
    return this.sessionService.create({ userId: user.sub });
  }

  @Post(':sessionId/join')
  @Serialize(JoinToSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: JoinToSessionResponseDto })
  public join(@Param('sessionId') sessionId: string, @User() user: AuthorizedUser): Promise<{ id: string }> {
    return this.sessionService.joinToSession({ sessionId, userId: user.sub });
  }
}
