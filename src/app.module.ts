import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { appConfig } from './config/app.config';
import { jwtConfig } from './config/jwt.config';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, jwtConfig], isGlobal: true }),
    QuizModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secret,
          signOptions: { expiresIn: config.expiresIn },
        };
      },
      inject: [jwtConfig.KEY],
    }),
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
