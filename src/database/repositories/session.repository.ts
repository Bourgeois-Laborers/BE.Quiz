import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SessionStatus } from '@common/types/session-status.enum';

import { Session } from '../entities/session.entity';
import { CreateSessionProps } from './interfaces/create-session.interface';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly repository: Repository<Session>,
  ) {}

  public async createSessionAndSessionToUser({ userId, userAlias }: CreateSessionProps): Promise<{ id: string }> {
    const { id } = await this.repository.save({
      status: SessionStatus.PENDING,
      sessionToUser: [
        {
          isHost: true,
          userAlias,
          user: {
            id: userId,
          },
        },
      ],
    });

    return { id };
  }

  async findOne(query: Partial<Session>): Promise<Session> {
    return this.repository.findOneBy(query);
  }
}
