import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import {
  ICreateSession,
  ISessionRepository,
} from './interfaces/session.repository.interface';
import { uuidv7 } from 'uuidv7';
import { Status } from '../types/status.type';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(props: ICreateSession) {
    const sessionId = uuidv7();

    const session = await this.prismaService.sessionTable.create({
      data: {
        id: sessionId,
        status: Status.New,
        sessions: { create: { user: { connect: { id: props.userId } } } },
      },
    });

    return session;
  }
}
