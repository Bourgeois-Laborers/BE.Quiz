import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DatabaseModule } from 'src/database/database.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { getJwtConfig } from '@config/jwt.config';

@Module({
  imports: [DatabaseModule, JwtModule.registerAsync(getJwtConfig())],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
})
export class AuthModule {}
