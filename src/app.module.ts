import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { appConfig } from './config/app.config';
import { jwtConfig } from './config/jwt.config';
import { QuizModule } from './quiz/quiz.module';

import { AuthModule } from '@/modules/auth/auth.module';
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
})
export class AppModule {}
