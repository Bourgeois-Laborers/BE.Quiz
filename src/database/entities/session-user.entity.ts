import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Session } from './session.entity';

@Entity({
  name: 'sessions_users',
})
export class SessionToUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.sessionToUser)
  user: User;

  @Column({ name: 'user_alias', type: 'varchar' })
  userAlias: string;

  @Column({ name: 'is_host', type: 'boolean' })
  isHost: boolean;

  @ManyToOne(() => Session, (session) => session.sessionToUser)
  session: Session;
}
