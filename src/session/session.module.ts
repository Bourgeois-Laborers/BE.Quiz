import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';
import { SessionGateway } from './session.gateway';

@Module({
  imports: [DatabaseModule],
  controllers: [SessionController],
  providers: [SessionService, SessionGateway],
})
export class SessionModule {}
