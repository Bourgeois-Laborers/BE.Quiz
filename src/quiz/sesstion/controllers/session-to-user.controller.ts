import { Body, Controller, Post } from '@nestjs/common';
import { SessionToUserService } from '../services/session-to-user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('session')
@ApiTags('Sessions')
export class SessionToUserController {
  constructor(private readonly sessionToUserService: SessionToUserService) {}

  @Post('join')
  async join(@Body() dto) {
    return this.sessionToUserService.join(dto);
  }
}
