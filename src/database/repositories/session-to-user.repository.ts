import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SessionToUser } from '../entities/session-user.entity';

export class SessionToUserRepository {
  constructor(@InjectRepository(SessionToUser) private readonly sessionToUserRepository: Repository<SessionToUser>) {}

  public async joinToSession({ userId, sessionId }): Promise<SessionToUser> {
    return this.sessionToUserRepository.save({
      isAdmin: false,
      session: {
        id: sessionId,
      },
      user: {
        id: userId,
      },
    });
  }
}
