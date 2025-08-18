import { Injectable } from '@nestjs/common';

import {
  ISessionToUser,
  IJoinSession,
  ILeaveSession,
  ISessionToUserService,
} from './interfaces/session-to-user.service.interface';
import { SessionToUserRepository } from '../repositories/session-to-user.repository';

@Injectable()
export class SessionToUserService implements ISessionToUserService {
  constructor(
    private readonly sessionToUserRepository: SessionToUserRepository,
  ) {}

  async getUsers(sessionId: string): Promise<ISessionToUser[]> {
    return this.sessionToUserRepository.getUsers(sessionId);
  }

  async join(props: IJoinSession): Promise<ISessionToUser[]> {
    await this.sessionToUserRepository.join({ ...props, isHost: false });
    return this.sessionToUserRepository.getUsers(props.sessionId);
  }

  async leave(props: ILeaveSession): Promise<void> {
    return this.sessionToUserRepository.leave(props);
  }
}
