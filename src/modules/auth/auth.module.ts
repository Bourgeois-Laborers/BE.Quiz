import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

import { jwtConfig } from '@/config/jwt.config';
import { UserModule } from '@/modules/user/user.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.accessToken.secret,
          signOptions: { expiresIn: config.accessToken.expiresIn },
        };
      },
      inject: [jwtConfig.KEY],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
