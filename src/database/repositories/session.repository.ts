import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Session } from '../entities/session.entity';
import { CreateSessionProps } from './interfaces/create-session.interface';

@Injectable()
export class SessionRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sesstionRepository: Repository<Session>,
  ) {}

  public async createSession({ userId }: CreateSessionProps): Promise<{id: string}> {
    const { id } = await this.sesstionRepository.save({
      sessionToUser: [
        {
          isHost: true,
          user: {
            id: userId,
          },
        },
      ],
    });

    return { id }
  }
}
