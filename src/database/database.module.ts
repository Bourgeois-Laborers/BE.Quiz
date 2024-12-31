import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UsersRepository } from './repositories/user.repository';
import { Session } from './entities/session.entity';
import { SessionToUser } from './entities/session-user.entity';
import { SessionRepository } from './repositories/session.repository';
import { SessionToUserRepository } from './repositories/session-to-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Session, SessionToUser])],
  providers: [UsersRepository, SessionRepository, SessionToUserRepository],
  exports: [UsersRepository, SessionRepository, SessionToUserRepository],
})
export class DatabaseModule {}
