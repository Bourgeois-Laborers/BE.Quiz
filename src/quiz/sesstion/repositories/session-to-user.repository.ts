import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Prisma } from 'prisma/prisma';

import {
  ICheckIsUserAlreadyJoined,
  IJoinSession,
  ISessionToUser,
  ISessionToUserRepository,
} from './interfaces/session-to-user.repository.interface';
import { appConfig } from '../../../../src/config/app.config';
import { Status } from '../types/status.type';

@Injectable()
export class SessionToUserRepository implements ISessionToUserRepository {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
  ) {}

  async join(props: IJoinSession) {
    await this.prismaService.sessionToUserTable.create({
      data: {
        user: { connect: { id: props.userId } },
        session: { connect: { id: props.sessionId } },
        isHost: props.isHost,
        userAlias: props.userAlias,
      },
    });
  }

  async checkIsUserAlreadyJoined({
    isHost,
    sessionId,
    userId,
  }: ICheckIsUserAlreadyJoined): Promise<boolean> {
    const where: Prisma.SessionToUserWhereInput = {
      user: { id: userId },
      session: {
        status: {
          not: Status.Closed,
        },
      },
    };

    if (typeof isHost === 'boolean') {
      where.isHost = isHost;
    }

    if (typeof sessionId === 'string') {
      where.session = {
        id: sessionId,
      };
    }

    const session = await this.prismaService.sessionToUserTable.count({
      where,
    });

    return Boolean(session);
  }

  async getSessionUsers(sessionId: string): Promise<ISessionToUser[]> {
    const users = await this.prismaService.sessionToUserTable.findMany({
      where: {
        session: { id: sessionId },
      },
    });

    return users;
  }

  async checkIsSessionFull(sessionId: string): Promise<boolean> {
    const userCount = await this.prismaService.sessionToUserTable.count({
      where: {
        session: { id: sessionId },
      },
    });

    const sessionSize = this.config.sessionSize;

    return userCount === sessionSize;
  }
}
