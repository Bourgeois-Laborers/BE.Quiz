import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@database/entities/user.entity';
import { UsersRepository } from '@database/repositories/user.repository';
import { Session } from '@database/entities/session.entity';
import { SessionToUser } from '@database/entities/session-user.entity';
import { SessionRepository } from '@database/repositories/session.repository';
import { SessionToUserRepository } from '@database/repositories/session-to-user.repository';
import { QuizExecution } from '@database/entities/quiz-execution.entity';
import { QuizConfig } from '@database/entities/quiz-configuration.entity';
import { QuizExecutionResult } from '@database/entities/quiz-execution-result.entity';
import { Answer } from '@database/entities/answer.entity';
import { Question } from '@database/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Session,
      SessionToUser,
      QuizExecution,
      QuizConfig,
      QuizExecutionResult,
      Answer,
      Question,
    ]),
  ],
  providers: [UsersRepository, SessionRepository, SessionToUserRepository],
  exports: [UsersRepository, SessionRepository, SessionToUserRepository],
})
export class DatabaseModule {}
