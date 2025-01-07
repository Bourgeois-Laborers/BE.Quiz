import { Body, Controller, HttpStatus, Param, Post, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';
import { Serialize } from '@common/decorators/serialize.decorator';
import { User } from '@common/decorators/user.decorator';

import { AuthorizedUser } from '@common/interfaces/user.interface';

import { SessionService } from './session.service';
import { CreateSessionDto, CreateSessionResponseDto } from './dto/create-session.dto';
import { JoinSessionDto, JoinToSessionResponseDto } from './dto/join-to-session.dto';
import { LeaveFromSessionResponseDto } from './dto/leave-from-session.dto';

@Controller('sessions')
@ControllerComposeDecorator({ guards: ['AuthGuard'] })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Serialize(CreateSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateSessionResponseDto })
  public createAndJoin(@User() user: AuthorizedUser, @Body() { userAlias }: CreateSessionDto): Promise<{ id: string }> {
    return this.sessionService.createSessionWithJoin({ userId: user.sub, userAlias });
  }

  @Post(':sessionId/join')
  @Serialize(JoinToSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: JoinToSessionResponseDto })
  public join(
    @Param('sessionId') sessionId: string,
    @User() user: AuthorizedUser,
    @Body() { userAlias }: JoinSessionDto,
  ): Promise<{ id: string }> {
    return this.sessionService.joinToSession({ sessionId, userId: user.sub, userAlias });
  }

  @Delete(':sessionId/leave')
  @Serialize(LeaveFromSessionResponseDto)
  @ApiResponse({ status: HttpStatus.ACCEPTED, type: LeaveFromSessionResponseDto })
  public leave(@Param('sessionId') sessionId: string, @User() user: AuthorizedUser): Promise<void> {
    return this.sessionService.leaveFromSession({ sessionId, userId: user.sub });
  }
}
