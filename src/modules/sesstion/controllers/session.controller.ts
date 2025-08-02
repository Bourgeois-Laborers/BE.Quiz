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

import { ApiResponseWrapper } from '@/common/decorators/api-response.decorator';
import { User } from '@/modules/auth/decorators/user.decorator';
import { ITokenPayload } from '@/modules/auth/services/interfaces/auth.interface';
import {
  CreateSessionDto,
  CreateSessionResponseDto,
} from '@/modules/sesstion/dtos/create-session.dto';
import { SessionDto } from '@/modules/sesstion/dtos/session.dto';
import {
  UpdateSessionDto,
  UpdateSessionResponseDto,
} from '@/modules/sesstion/dtos/update-session.dto';
import { SessionService } from '@/modules/sesstion/services/session.service';

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
  @ApiResponseWrapper(SessionDto, 'Session retrieved successfully')
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
  @ApiResponseWrapper(
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
  @ApiResponseWrapper(UpdateSessionResponseDto, 'Session updated successfully')
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updateSessionDto: UpdateSessionDto,
    @User() { id: userId }: ITokenPayload,
  ): Promise<UpdateSessionResponseDto> {
    return this.sessionService.update(sessionId, userId, updateSessionDto);
  }
}
