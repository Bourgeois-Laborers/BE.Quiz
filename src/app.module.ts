import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { ApiResponseInterceptor } from './common/interceptors/api-response.interceptor';
import { appConfig } from './config/app.config';
import { jwtConfig } from './config/jwt.config';

import { AuthModule } from '@/modules/auth/auth.module';
import { QuizModule } from '@/modules/quiz/quiz.module';
import { SessionModule } from '@/modules/sesstion/session.module';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, jwtConfig], isGlobal: true }),
    AuthModule,
    UserModule,
    SessionModule,
    QuizModule,
    BullModule.forRootAsync({
      useFactory: (config: ConfigType<typeof appConfig>) => ({
        connection: {
          url: config.redisUrl,
        },
      }),
      inject: [appConfig.KEY],
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
  ],
})
export class AppModule {}
