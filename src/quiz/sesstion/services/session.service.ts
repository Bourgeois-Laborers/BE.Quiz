import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ICreateSession,
  ISession,
  ISessionService,
} from './interfaces/session.service.interface';
import { SessionRepository } from '../repositories/session.repository';
import { SessionToUserService } from './session-to-user.service';
import { UserService } from 'src/quiz/user/services/user.service';
import { getAvailableNextStatuses, Status } from '../types/status.type';

@Injectable()
export class SessionService implements ISessionService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly sessionToUserService: SessionToUserService,
    private readonly userService: UserService,
  ) {}

  async start(sessionId: string, userId: string): Promise<ISession> {
    await this._validateUserAndPermissions(sessionId, userId, {
      requiresHost: true,
    });

    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    this._checkIsChangeStatusAllowed(session.status as Status);

    const startedSession = await this.sessionRepository.updateStatus(
      sessionId,
      Status.Active,
    );

    return startedSession;
  }

  async create({ userAlias, userId }: ICreateSession): Promise<ISession> {
    const user = await this.userService.get(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isUserAlreadyHaveActiveSession =
      await this.sessionToUserService.checkIsUserAlreadyJoined({ userId });

    if (isUserAlreadyHaveActiveSession) {
      throw new BadRequestException('User has active session');
    }

    const session = await this.sessionRepository.create({ userAlias, userId });

    return session;
  }

  async pause(sessionId: string, userId: string) {
    await this._validateUserAndPermissions(sessionId, userId, {
      requiresHost: true,
    });

    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    this._checkIsChangeStatusAllowed(session.status as Status);

    const updatedSession = await this.sessionRepository.updateStatus(
      sessionId,
      Status.Paused,
    );

    return updatedSession;
  }

  async finish(sessionId: string, userId: string) {
    await this._validateUserAndPermissions(sessionId, userId, {
      requiresHost: true,
    });

    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    this._checkIsChangeStatusAllowed(session.status as Status);

    const updatedSession = await this.sessionRepository.updateStatus(
      sessionId,
      Status.Finished,
    );

    return updatedSession;
  }

  async get(sessionId: string, userId: string) {
    await this._validateUserAndPermissions(sessionId, userId);

    const session = await this.sessionRepository.get(sessionId, userId);

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }

  private async _validateUserAndPermissions(
    sessionId: string,
    userId: string,
    { requiresHost = false } = {},
  ) {
    const user = await this.userService.get(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPermitted =
      await this.sessionToUserService.checkIsUserAlreadyJoined({
        sessionId,
        userId,
        isHost: requiresHost || undefined,
      });

    if (!isPermitted) {
      if (requiresHost) {
        throw new ForbiddenException(
          'User must be a host to perform this action.',
        );
      }
      throw new ForbiddenException('User is not part of this session.');
    }
  }

  private _checkIsChangeStatusAllowed(status: Status): void {
    if (!getAvailableNextStatuses(status).includes(status)) {
      throw new BadRequestException(
        `Status ${status} is not allowed for this operation.`,
      );
    }
  }
}
