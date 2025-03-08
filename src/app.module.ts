import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '@users/users.module';
import { SessionModule } from '@session/session.module';
import { AuthModule } from '@auth/auth.module';
import { EventsModule } from '@event/event.module';
import { HealthModule } from '@health/health.module';
import { PrometheusModule } from '@prometheus/prometheus.module';
import { QuizConfigurationModule } from '@quiz-configuration/quiz-configuration.module';
import { QuizExecutionModule } from '@quiz-execution/quiz-execution.module';

import { getDatabaseConfig } from '@config/database.config';

import { GptModule } from '@libs/gpt';
import { QuizExecutionModule } from './quiz-execution/quiz-execution.module';

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
    QuizConfigurationModule,
    QuizExecutionModule,
  ],
})
export class AppModule {}
