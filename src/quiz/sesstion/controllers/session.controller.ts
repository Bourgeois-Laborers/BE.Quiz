import { Body, Controller, Post } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('session')
@ApiTags('Sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async create(@Body() dto) {
    return this.sessionService.create(dto);
  }
}
