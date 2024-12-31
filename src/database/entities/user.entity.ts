import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { SessionToUser } from './session-user.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar' })
  username: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.user)
  sessionToUser: SessionToUser[];
}
