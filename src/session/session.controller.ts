import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ControllerComposeDecorator } from '@common/decorators/conroller-compose.decorator';
import { Serialize } from '@common/decorators/serialize.decorator';
import { User } from '@common/decorators/user.decorator';

import { AuthorizedUser } from '@common/interfaces/user.interface';

import { SessionService } from './session.service';
import { CreateSessionDto, CreateSessionResponseDto } from './dto/create-session.dto';
import { JoinSessionDto, JoinToSessionResponseDto } from './dto/join-to-session.dto';

@Controller('sessions')
@ControllerComposeDecorator({ guards: ['AuthGuard'] })
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @Serialize(CreateSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateSessionResponseDto })
  public create(@User() user: AuthorizedUser, @Body() createSessionDto: CreateSessionDto): Promise<{ id: string }> {
    return this.sessionService.create({ userId: user.sub, userAlias: createSessionDto.userAlias });
  }

  @Post(':sessionId/join')
  @Serialize(JoinToSessionResponseDto)
  @ApiResponse({ status: HttpStatus.CREATED, type: JoinToSessionResponseDto })
  public join(
    @Param('sessionId') sessionId: string,
    @User() user: AuthorizedUser,
    @Body() joinSessionDto: JoinSessionDto,
  ): Promise<{ id: string }> {
    return this.sessionService.joinToSession({ sessionId, userId: user.sub, userAlias: joinSessionDto.userAlias });
  }
}
