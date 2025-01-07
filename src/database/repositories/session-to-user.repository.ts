import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { SessionStatus } from '@common/types/session-status.enum';

import { SessionToUser } from '../entities/session-user.entity';
import { JoinToSessionProps } from './interfaces/join-to-session.interface';

export class SessionToUserRepository {
  constructor(@InjectRepository(SessionToUser) private readonly sessionToUserRepository: Repository<SessionToUser>) {}

  public async createSessionToUser({ userId, userAlias, sessionId }: JoinToSessionProps): Promise<SessionToUser> {
    return this.sessionToUserRepository.save({
      isHost: false,
      userAlias,
      session: {
        id: sessionId,
      },
      user: {
        id: userId,
      },
    });
  }

  public async deleteSessionToUser({ userId, sessionId }: { userId: string; sessionId: string }): Promise<void> {
    await this.sessionToUserRepository.delete({
      user: {
        id: userId,
      },
      session: {
        id: sessionId,
      },
    });
  }

  public async findUserInSession({ userId, sessionId }: { userId: string; sessionId: string }): Promise<SessionToUser> {
    return this.sessionToUserRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        session: {
          id: sessionId,
        },
      },
    });
  }

  public async findUserActiveSession(userId: string): Promise<SessionToUser> {
    return this.sessionToUserRepository.findOne({
      where: {
        user: {
          id: userId,
        },
        session: {
          status: Not(SessionStatus.FINISHED),
        },
      },
    });
  }

  public findUserAliasInSession({
    sessionId,
    userAlias,
  }: {
    sessionId: string;
    userAlias: string;
  }): Promise<SessionToUser> {
    return this.sessionToUserRepository.findOne({
      where: {
        userAlias,
        session: {
          id: sessionId,
        },
      },
    });
  }
}
