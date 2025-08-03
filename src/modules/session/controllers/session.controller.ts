import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
  ApiExtraModels,
} from '@nestjs/swagger';

import { ResponseWrapper } from '@/common/decorators/api-response.decorator';
import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';
import {
  CreateSessionDto,
  CreateSessionResponseDto,
} from '@/modules/session/dtos/create-session.dto';
import { SessionDto } from '@/modules/session/dtos/session.dto';
import {
  UpdateSessionDto,
  UpdateSessionResponseDto,
} from '@/modules/session/dtos/update-session.dto';
import { SessionService } from '@/modules/session/services/session.service';

@Controller('session')
@ApiTags('Sessions')
@ApiExtraModels(CreateSessionResponseDto, UpdateSessionResponseDto)
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get(':sessionId')
  @ApiOperation({ summary: 'Get session details' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ResponseWrapper(SessionDto, 'Session retrieved successfully')
  async getSession(
    @Param('sessionId') sessionId: string,
    @User() { id: userId }: ITokenPayload,
  ): Promise<SessionDto> {
    return this.sessionService.get(sessionId, userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new session' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ResponseWrapper(
    CreateSessionResponseDto,
    'Session created successfully',
    HttpStatus.CREATED,
  )
  async create(
    @Body() { userAlias }: CreateSessionDto,
    @User() { id: userId }: ITokenPayload,
  ): Promise<CreateSessionResponseDto> {
    return this.sessionService.create(userId, { userAlias });
  }

  @Put(':sessionId')
  @ApiOperation({ summary: 'Update session details' })
  @ApiCookieAuth('accessToken')
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  @ResponseWrapper(UpdateSessionResponseDto, 'Session updated successfully')
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @User() { id: userId }: ITokenPayload,
  ): Promise<UpdateSessionResponseDto> {
    return this.sessionService.update(sessionId, userId, updateSessionDto);
  }
}
