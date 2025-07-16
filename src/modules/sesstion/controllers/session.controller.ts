import { Body, Controller, Param, Get, Post, Put } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
} from '@nestjs/swagger';

import {
  CreateSessionDto,
  CreateSessionResponseDto,
} from '../dtos/create-session.dto';
import { SessionDto } from '../dtos/session.dto';
import {
  UpdateSessionDto,
  UpdateSessionResponseDto,
} from '../dtos/update-session.dto';
import { SessionService } from '../services/session.service';

import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('session')
@ApiTags('Sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':sessionId')
  @ApiOperation({ summary: 'Get session details' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved session details.',
    type: SessionDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async getSession(
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
  ): Promise<SessionDto> {
    return this.sessionService.get(sessionId, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
    type: CreateSessionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(
    @Body() { userAlias }: CreateSessionDto,
    @User() { id: userId }: ITokenPayload,
  ): Promise<CreateSessionResponseDto> {
    return this.sessionService.create(userId, { userAlias });
  }

  @Put(':sessionId')
  @ApiOperation({ summary: 'Update session details' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully updated.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @User() { id: userId }: ITokenPayload,
  ): Promise<UpdateSessionResponseDto> {
    return this.sessionService.update(sessionId, userId, updateSessionDto);
  }
}
