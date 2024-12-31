import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { SessionToUser } from './session-user.entity';
import { User } from './user.entity';

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.id)
  hostUserId: string;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.session)
  sessionToUser: SessionToUser[];
}
