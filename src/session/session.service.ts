import { Injectable } from '@nestjs/common';
import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionType } from '@common/types/logic-exception-type.enum';

import { SessionRepository } from '../database/repositories/session.repository';
import { JoinUserProps } from './interfaces/join-user.interface';
import { SessionToUserRepository } from '../database/repositories/session-to-user.repository';
import { CreateSessionProps } from './interfaces/create-session.interface';
import { UsersRepository } from '../database/repositories/user.repository';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToUserRepository: SessionToUserRepository,
    private readonly userRepository: UsersRepository,
  ) {}

  public async create({ userId }: CreateSessionProps): Promise<{ id: string }> {
    await this.checkIsUserHasActiveSession(userId);

    return this.sessionRepository.createSession({ userId });
  }

  public async joinToSession({ userId, sessionId }: JoinUserProps): Promise<{ id: string }> {
    const checkIsUserExists = await this.userRepository.findOne({ id: userId });

    if (!checkIsUserExists) {
      throw new LogicException(LogicExceptionType.USER_NOT_FOUND);
    }

    await this.checkIsUserHasActiveSession(userId);

    return this.sessionToUserRepository.joinToSession({ sessionId, userId });
  }

  private async checkIsUserHasActiveSession(userId: string) {
    const checkIsUserHasActiveSession = await this.sessionToUserRepository.checkIsUserHasActiveSession(userId);

    if (checkIsUserHasActiveSession) {
      throw new LogicException(LogicExceptionType.USER_ALREADY_HAS_ACTIVE_SESSION);
    }
  }
}
