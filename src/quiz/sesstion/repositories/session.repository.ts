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
        sessionUsers: {
          create: {
            user: { connect: { id: props.userId } },
            isHost: true,
            userAlias: props.userAlias,
          },
        },
      },
    });

    return session;
  }

  async updateStatus(sessionId: string, status: Status) {
    const updatedResult = await this.prismaService.sessionTable.update({
      data: {
        status,
      },
      where: {
        id: sessionId,
      },
    });

    return updatedResult;
  }

  async get(sessionId: string, userId: string) {
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
}
