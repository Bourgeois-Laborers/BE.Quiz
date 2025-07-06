import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  ISession,
  ICreateSession,
  IUpdateSession,
  ISessionService,
} from './interfaces/session.service.interface';
import { SessionRepository } from '../repositories/session.repository';
import {
  getAvailableNextStatuses,
  SessionStatus,
} from '../types/session-status.type';

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async get(sessionId: string, userId: string): Promise<ISession> {
    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  async create(userId: string, props: ICreateSession): Promise<ISession> {
    const session = await this.sessionRepository.create(userId, props);

    return session;
  }

  async update(
    sessionId: string,
    userId: string,
    props: IUpdateSession,
  ): Promise<ISession> {
    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (props.status) {
      this._validateStatusChange(props.status);
    }

    const updatedSession = await this.sessionRepository.update(
      sessionId,
      userId,
      props,
    );

    return updatedSession;
  }

  private _validateStatusChange(status: SessionStatus): void {
    if (!getAvailableNextStatuses(status).includes(status)) {
      throw new BadRequestException(
        `Status ${status} is not allowed for this operation.`,
      );
    }
  }
}
