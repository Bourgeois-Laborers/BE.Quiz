import { Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { Serialize } from '@common/decorators/serialize.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';

import { SessionService } from './session.service';
import { CreateSessionResponseDto } from './dto/create-session.dto';
import { JoinToSessionResponseDto } from './dto/join-to-session';
import { User } from '@common/decorators/user.decorator';
import { AuthorizedUser } from '@common/interfaces/user.inteface';

@Controller('sessions')
@ControllerComposeDecorator({ guards: ['AuthGuard']})
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Serialize(CreateSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateSessionResponseDto })
  public create(@User() user: AuthorizedUser) {
    return this.sessionService.create({ userId: user.sub });
  }

  @Post(':sessionId/join')
  @Serialize(JoinToSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: JoinToSessionResponseDto })
  public join(@Param('sessionId') sessionId: string, @User() user: AuthorizedUser ) {
    return this.sessionService.joinToSession({ sessionId, userId: user.sub });
  }
}
