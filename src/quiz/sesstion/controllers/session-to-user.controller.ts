import { Body, Controller, Param, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthGuard } from '../../../auth/auth.guard';
import { CreateSessionToUserDto } from '../dtos/create-session-to-user.dto';
import { SessionToUserDto } from '../dtos/session-to-user.dto';
import { SessionToUserService } from '../services/session-to-user.service';

import { ITokenUser } from '~/auth/interfaces/auth.interface';
import { User } from '~/common/decorators/user.decorator';

@Controller('session')
@ApiTags('Sessions')
@ApiBearerAuth()
export class SessionToUserController {
  constructor(private readonly sessionToUserService: SessionToUserService) {}

  @Get(':sessionId/users')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get users in a session' })
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
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Join a session' })
  @ApiResponse({ status: 201, description: 'Successfully joined the session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async join(
    @Body() { userAlias }: CreateSessionToUserDto,
    @User() { id: userId }: ITokenUser,
    @Param('sessionId') sessionId: string,
  ): Promise<SessionToUserDto[]> {
    return this.sessionToUserService.join({ sessionId, userId, userAlias });
  }

  @Post(':sessionId/leave')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Leave a session' })
  @ApiResponse({ status: 201, description: 'Successfully leaved the session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async leave(
    @User() { id: userId }: ITokenUser,
    @Param('sessionId') sessionId: string,
  ): Promise<void> {
    return this.sessionToUserService.leave({ sessionId, userId });
  }
}
