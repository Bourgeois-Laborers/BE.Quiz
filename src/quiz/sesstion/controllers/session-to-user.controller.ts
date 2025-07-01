import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';
import { User } from 'src/common/decorators/user.decorator';

import { AuthGuard } from '../../../auth/auth.guard';
import { JoinSessionDto } from '../dtos/join-session.dto';
import { SessionToUserService } from '../services/session-to-user.service';

@Controller('session')
@ApiTags('Sessions')
@ApiBearerAuth()
export class SessionToUserController {
  constructor(private readonly sessionToUserService: SessionToUserService) {}

  @Post(':sessionId/join')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Join a session' })
  @ApiResponse({ status: 201, description: 'Successfully joined the session.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  async join(
    @Body() { userAlias }: JoinSessionDto,
    @User() { id: userId }: ITokenUser,
    @Param('sessionId') sessionId: string,
  ) {
    return this.sessionToUserService.join({ sessionId, userId, userAlias });
  }
}
