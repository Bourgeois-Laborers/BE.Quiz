import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SessionStatus } from '@common/types/session-status.enum';

import { SessionToUser } from './session-user.entity';

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SessionStatus })
  status: SessionStatus;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.session)
  sessionToUser: SessionToUser[];
}
