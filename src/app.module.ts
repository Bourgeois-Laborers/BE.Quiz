import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { SessionModule } from '@session/session.module';
import { AuthModule } from '@auth/auth.module';
import { EventsModule } from '@event/event.module';

import { getDatabaseConfig } from '@config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(getDatabaseConfig()),
    UsersModule,
    SessionModule,
    AuthModule,
    EventsModule,
  ],
})
export class AppModule {}
