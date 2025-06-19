import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SessionModule } from './sesstion/session.module';

@Module({
  imports: [UserModule, SessionModule],
})
export class QuizModule {}
