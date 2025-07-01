import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthGuard } from './auth.guard';

@Module({
  imports: [JwtModule],
  providers: [AuthGuard],
})
export class AuthModuel {}
