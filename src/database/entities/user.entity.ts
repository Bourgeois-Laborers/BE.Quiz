import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SessionToUser } from '@database/entities/session-user.entity';
import { QuizExecResult } from '@database/entities/quiz-exec-result.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.user)
  sessionToUser: SessionToUser[];

  @OneToMany(() => QuizExecResult, (quizExecResult) => quizExecResult.user)
  quizExecResult: QuizExecResult[];
}
