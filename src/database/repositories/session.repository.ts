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

  public async updateSessionStatus(sessionId: string, status: SessionStatus): Promise<{ id: string }> {
    await this.repository.update(sessionId, { status });

    return { id: sessionId };
  }

  async findOne(query: Partial<Session>): Promise<Session> {
    return this.repository.findOneBy(query);
  }
}
