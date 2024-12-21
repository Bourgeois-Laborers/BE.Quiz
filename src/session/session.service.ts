import { Injectable } from '@nestjs/common';
import { LogicException } from '@common/exceptions/logic-exception';
import { LogicExceptionList } from '@common/types/logic-exceptions.enum';

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

  public async create({ userId }: CreateSessionProps) {
    return this.sessionRepository.creareSession({ userId });
  }

  public async joinToSession({ userId, sessionId }: JoinUserProps) {
    const checkIsUserExists = await this.userRepository.findOne({ id: userId });

    if (!checkIsUserExists) {
      throw new LogicException(LogicExceptionList.USER_NOT_FOUND);
    }

    return this.sessionToUserRepository.joinToSession({ sessionId, userId });
  }
}
