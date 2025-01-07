import { Injectable } from '@nestjs/common';

import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionType } from '@common/types/logic-exception-type.enum';

import { SessionRepository } from '@database/repositories/session.repository';
import { SessionToUserRepository } from '@database/repositories/session-to-user.repository';

import { JoinUserProps } from './interfaces/join-user.interface';
import { CreateSessionProps } from './interfaces/create-session.interface';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToUserRepository: SessionToUserRepository,
  ) {}

  public async createSessionWithJoin({ userId, userAlias }: CreateSessionProps): Promise<{ id: string }> {
    const isUserHasActiveSession = await this.sessionToUserRepository.findUserActiveSession(userId);
    if (isUserHasActiveSession) {
      throw new LogicException(LogicExceptionType.USER_ALREADY_HAS_ACTIVE_SESSION);
    }

    return this.sessionRepository.createSessionAndSessionToUser({ userId, userAlias });
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

    return this.sessionToUserRepository.createSessionToUser({ sessionId, userId, userAlias });
  }
}
