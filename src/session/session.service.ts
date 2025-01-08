import { Injectable } from '@nestjs/common';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionType } from '@common/types/logic-exception-type.enum';
import { SessionStatus } from '@common/types/session-status.enum';

import { SessionRepository } from '@database/repositories/session.repository';
import { SessionToUserRepository } from '@database/repositories/session-to-user.repository';

import { SessionGateway } from './session.gateway';

import { JoinUserProps } from './interfaces/join-user.interface';
import { CreateSessionProps } from './interfaces/create-session.interface';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToUserRepository: SessionToUserRepository,
    private readonly sessionGateway: SessionGateway,
  ) {}

  public async createSessionWithJoin({ userId, userAlias }: CreateSessionProps): Promise<{ id: string }> {
    const isUserHasActiveSession = await this.sessionToUserRepository.findUserActiveSession(userId);
    if (isUserHasActiveSession) {
      throw new LogicException(LogicExceptionType.USER_ALREADY_HAS_ACTIVE_SESSION);
    }

    const { id } = await this.sessionRepository.createSessionAndSessionToUser({ userId, userAlias });
    await this.sessionGateway.handleSessionJoin({ sessionId: id, userId, userAlias });
    return { id };
  }

  public async joinToSession({ userId, userAlias, sessionId }: JoinUserProps): Promise<{ id: string }> {
    const isSessionExists = await this.sessionRepository.findOne({ id: sessionId });
    if (!isSessionExists) {
      throw new LogicException(LogicExceptionType.SESSION_NOT_FOUND);
    }

    const isUserHasActiveSession = await this.sessionToUserRepository.findUserActiveSession(userId);
    if (isUserHasActiveSession) {
      throw new LogicException(LogicExceptionType.USER_ALREADY_HAS_ACTIVE_SESSION);
    }

    const isUserAliasAvailable = await this.sessionToUserRepository.findUserAliasInSession({ sessionId, userAlias });
    if (isUserAliasAvailable) {
      throw new LogicException(LogicExceptionType.SESSION_USER_ALIAS_ALREADY_EXISTS);
    }

    const { id } = await this.sessionToUserRepository.createSessionToUser({ sessionId, userId, userAlias });
    await this.sessionGateway.handleSessionJoin({ sessionId, userId, userAlias });
    return { id };
  }

  public async leaveFromSession({ userId, sessionId }: { userId: string; sessionId: string }): Promise<void> {
    const sessionToUser = await this.sessionToUserRepository.findUserInSession({ sessionId, userId });
    if (!sessionToUser) {
      throw new LogicException(LogicExceptionType.SESSION_NOT_FOUND);
    }

    if (sessionToUser.isHost) {
      await this.sessionRepository.updateSessionStatus(sessionId, SessionStatus.CANCELED);
    } else {
      await this.sessionToUserRepository.deleteSessionToUser({ sessionId, userId });
      await this.sessionGateway.handleSessionLeave({ sessionId, userId, userAlias: sessionToUser.userAlias });
    }
  }
}
