import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SessionToUser } from '@database/entities/session-user.entity';
import { User } from '@database/entities/user.entity';

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.id)
  hostUserId: string;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.session)
  sessionToUser: SessionToUser[];
}
