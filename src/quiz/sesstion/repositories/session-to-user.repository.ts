import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import {
  ICheckIsUserAlreadyJoined,
  IJoinSession,
  ISessionToUserRepository,
} from './interfaces/session-to-user.repository.interface';

@Injectable()
export class SessionToUserRepository implements ISessionToUserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async join(props: IJoinSession) {
    await this.prismaService.sessionToUserTable.create({
      data: {
        user: { connect: { id: props.userId } },
        session: { connect: { id: props.sessionId } },
      },
    });
  }

  async checkIsUserAlreadyJoined(
    props: ICheckIsUserAlreadyJoined,
  ): Promise<boolean> {
    const session = await this.prismaService.sessionToUserTable.count({
      where: {
        user: { id: props.userId },
        session: { id: props.sessionId },
      },
    });

    return Boolean(session);
  }
}
