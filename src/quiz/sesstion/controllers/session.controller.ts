import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';

import {
  CreateSessionDto,
  CreateSessionResponseDto,
} from '../dtos/create-session.dto';
import { SessionService } from '../services/session.service';

@Controller('session')
@ApiTags('Sessions')
@ApiBearerAuth()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
    type: CreateSessionResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async create(
    @Body() { userAlias }: CreateSessionDto,
    @User() user: ITokenUser,
  ): Promise<CreateSessionResponseDto> {
    return this.sessionService.create({ userAlias, userId: user.id });
  }

  @Put(':sessionId/start')
  @ApiOperation({ summary: 'Start a session' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully started.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async start(@Param('sessionId') sessionId: string, @User() user: ITokenUser) {
    return this.sessionService.start(sessionId, user.id);
  }

  @Put(':sessionId/cloase')
  @ApiOperation({ summary: 'Close a session' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully closed.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async close(@Param('sessionId') sessionId: string, @User() user: ITokenUser) {
    return this.sessionService.close(sessionId, user.id);
  }

  @Get(':sessionId')
  @ApiOperation({ summary: 'Get session details' })
  @ApiResponse({ status: 200, description: 'Return session details.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async get(@Param('sessionId') sessionId: string, @User() user: ITokenUser) {
    return this.sessionService.get(sessionId, user.id);
  }
}
