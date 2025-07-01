import { PrismaModule } from '@app/prisma';
import { Module } from '@nestjs/common';
import { SessionRepository } from './repositories/session.repository';
import { SessionToUserRepository } from './repositories/session-to-user.repository';
import { SessionService } from './services/session.service';
import { SessionToUserService } from './services/session-to-user.service';
import { SessionController } from './controllers/session.controller';
import { SessionToUserController } from './controllers/session-to-user.controller';
import { UserModule } from '../user/user.module';

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
