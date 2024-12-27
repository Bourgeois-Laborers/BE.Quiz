import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Session, (session) => session.sessionToUser)
  session: Session;
}
