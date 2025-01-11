import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SessionToUser } from '@database/entities/session-user.entity';
import { QuizExecutionResult } from '@database/entities/quiz-execution-result.entity';
import { QuizConfiguration } from '@database/entities/quiz-configuration.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.user)
  sessionToUser: SessionToUser[];

  @OneToMany(() => QuizExecutionResult, (quizExecutionResult) => quizExecutionResult.user)
  quizExecutionResults: QuizExecutionResult[];

  @OneToMany(() => QuizConfiguration, (quizConfiguration) => quizConfiguration.createdBy)
  quizConfigurations: QuizConfiguration[];
}
