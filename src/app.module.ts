import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import { getDatabaseConfig } from '@config/database.config';
import { getJwtConfig } from '@config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(getDatabaseConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
