import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';

import { SessionToUserController } from './controllers/session-to-user.controller';
import { SessionController } from './controllers/session.controller';
import { SessionToUserRepository } from './repositories/session-to-user.repository';
import { SessionRepository } from './repositories/session.repository';
import { SessionToUserService } from './services/session-to-user.service';
import { SessionService } from './services/session.service';

import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [SessionController, SessionToUserController],
  providers: [
    SessionRepository,
    SessionToUserRepository,
    SessionService,
    SessionToUserService,
  ],
  exports: [SessionService, SessionToUserService],
})
export class SessionModule {}
