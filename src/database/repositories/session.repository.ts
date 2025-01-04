import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Session } from '../entities/session.entity';
import { CreateSessionProps } from './interfaces/create-session.interface';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  public async createSession({ userId, userAlias }: CreateSessionProps): Promise<{ id: string }> {
    const { id } = await this.sessionRepository.save({
      sessionToUser: [
        {
          isHost: true,
          userAlias: userAlias,
          user: {
            id: userId,
          },
        },
      ],
    });

    return { id };
  }
}
