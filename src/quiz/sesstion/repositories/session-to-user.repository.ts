import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

import {
  ISessionToUser,
  IJoinSession,
  ILeaveSession,
  ISessionToUserRepository,
} from './interfaces/session-to-user.repository.interface';

@Injectable()
export class SessionToUserRepository implements ISessionToUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers(sessionId: string): Promise<ISessionToUser[]> {
    const users = await this.prismaService.sessionToUserTable.findMany({
      where: {
        session: { id: sessionId },
      },
    });

    return users;
  }

  async join(props: IJoinSession): Promise<void> {
    await this.prismaService.sessionToUserTable.create({
      data: {
        user: { connect: { id: props.userId } },
        session: { connect: { id: props.sessionId } },
        isHost: props.isHost,
        userAlias: props.userAlias,
      },
    });
  }

  async leave(props: ILeaveSession): Promise<void> {
    await this.prismaService.sessionToUserTable.deleteMany({
      where: {
        session: { id: props.sessionId },
        user: { id: props.userId },
      },
    });
  }
}
