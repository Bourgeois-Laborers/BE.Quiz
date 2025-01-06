import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

import { SessionStatus } from '@common/types/session-status.enum';

import { SessionToUser } from './session-user.entity';

@Entity({
  name: 'sessions',
})
export class Session {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({ type: 'enum', enum: SessionStatus })
  status: SessionStatus;

  @OneToMany(() => SessionToUser, (sessionToUser) => sessionToUser.session)
  sessionToUser: SessionToUser[];
}
