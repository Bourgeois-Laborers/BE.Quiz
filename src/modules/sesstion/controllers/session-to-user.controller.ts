import { Body, Controller, Param, Get, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';

import { CreateSessionToUserDto } from '../dtos/create-session-to-user.dto';
import { SessionToUserDto } from '../dtos/session-to-user.dto';
import { SessionToUserService } from '../services/session-to-user.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('session')
@ApiTags('Sessions')
export class SessionToUserController {
  constructor(private readonly sessionToUserService: SessionToUserService) {}

  @Get(':sessionId/users')
  @ApiOperation({ summary: 'Get users in a session' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved session users.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async getUsers(
    @Param('sessionId') sessionId: string,
  ): Promise<SessionToUserDto[]> {
    return this.sessionToUserService.getUsers(sessionId);
  }

  @Post(':sessionId/join')
  @ApiOperation({ summary: 'Join a session' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 201, description: 'Successfully joined the session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async join(
    @Body() { userAlias }: CreateSessionToUserDto,
    @User() { id: userId }: ITokenPayload,
    @Param('sessionId') sessionId: string,
  ): Promise<SessionToUserDto[]> {
    return this.sessionToUserService.join({ sessionId, userId, userAlias });
  }

  @Post(':sessionId/leave')
  @ApiOperation({ summary: 'Leave a session' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 201, description: 'Successfully leaved the session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async leave(
    @User() { id: userId }: ITokenPayload,
    @Param('sessionId') sessionId: string,
  ): Promise<void> {
    return this.sessionToUserService.leave({ sessionId, userId });
  }
}
