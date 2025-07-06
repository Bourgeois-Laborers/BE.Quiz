import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { uuidv7 } from 'uuidv7';

import {
  ISession,
  ICreateSession,
  IUpdateSession,
  ISessionRepository,
} from './interfaces/session.repository.interface';
import { SessionStatus } from '../types/session-status.type';

@Injectable()
export class SessionRepository implements ISessionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async get(sessionId: string, userId: string): Promise<ISession | null> {
    const session = await this.prismaService.sessionTable.findFirst({
      where: {
        id: sessionId,
        sessionUsers: {
          some: {
            id: userId,
          },
        },
      },
    });

    return session;
  }

  async create(userId: string, props: ICreateSession): Promise<ISession> {
    const sessionId = uuidv7();

    const session = await this.prismaService.sessionTable.create({
      data: {
        id: sessionId,
        status: SessionStatus.OPEN,
        sessionUsers: {
          create: {
            user: { connect: { id: userId } },
            isHost: true,
            userAlias: props.userAlias,
          },
        },
      },
    });

    return session;
  }

  async update(
    sessionId: string,
    userId: string,
    props: IUpdateSession,
  ): Promise<ISession> {
    const updatedResult = await this.prismaService.sessionTable.update({
      data: {
        ...props,
      },
      where: {
        id: sessionId,
        sessionUsers: {
          some: {
            id: userId,
            isHost: true,
          },
        },
      },
    });

    return updatedResult;
  }
}
