import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SessionToUserService } from '../services/session-to-user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../../../auth/auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { ITokenUser } from 'src/auth/interfaces/auth.interface';
import { JoinSessionDto } from '../dtos/join-session.dto';

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
