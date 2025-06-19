import { BadRequestException, Injectable } from '@nestjs/common';
import {
  IJoinSession,
  ISessionToUserService,
} from './interfaces/session-to-user.service.interface';
import { SessionToUserRepository } from '../repositories/session-to-user.repository';

@Injectable()
export class SessionToUserService implements ISessionToUserService {
  constructor(
    private readonly sessionToUserRepository: SessionToUserRepository,
  ) {}
  async join(props: IJoinSession): Promise<void> {
    const checkIsUserAlreadyJoined =
      await this.sessionToUserRepository.checkIsUserAlreadyJoined(props);

    if (checkIsUserAlreadyJoined) {
      throw new BadRequestException('User already joined');
    }

    await this.sessionToUserRepository.join(props);
  }
}
