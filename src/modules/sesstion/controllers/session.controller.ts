import {
  Body,
  Controller,
  Param,
  Get,
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
import { AuthGuard } from '@/modules/auth/guards/auth.guard';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';

@Controller('session')
@ApiTags('Sessions')
@ApiBearerAuth()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':sessionId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get session details' })
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
    @User() { id: userId }: ITokenPayload,
  ): Promise<CreateSessionResponseDto> {
    return this.sessionService.create(userId, { userAlias });
  }

  @Put(':sessionId')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Update session details' })
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
