import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

import { jwtConfig } from '@/config/jwt.config';

@Module({
  imports: [
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
  ],
  providers: [AuthGuard, AuthService],
  exports: [AuthGuard, AuthService],
})
export class AuthModule {}
