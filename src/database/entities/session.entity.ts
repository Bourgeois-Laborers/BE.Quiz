import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SessionToUser } from './session-user.entity';
import { User } from './user.entity';
import { Expose } from 'class-transformer';

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  hostUserId: string;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.session)
  sessionToUser: SessionToUser[];
}
