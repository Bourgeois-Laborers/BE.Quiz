import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { SessionModule } from '@session/session.module';
import { AuthModule } from '@auth/auth.module';
import { EventsModule } from '@event/event.module';
import { HealthModule } from '@health/health.module';
import { PrometheusModule } from '@prometheus/prometheus.module';

import { getDatabaseConfig } from '@config/database.config';

import { GptModule } from '@app/gpt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(getDatabaseConfig()),
    UsersModule,
    SessionModule,
    AuthModule,
    EventsModule,
    HealthModule,
    PrometheusModule,
    GptModule,
  ],
})
export class AppModule {}
