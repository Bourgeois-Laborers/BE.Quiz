import { Injectable } from '@nestjs/common';
import {
  ICreateSession,
  ISession,
  ISessionService,
} from './interfaces/session.service.interface';
import { SessionRepository } from '../repositories/session.repository';

@Injectable()
export class SessionService implements ISessionService {
  constructor(private readonly sessionRepository: SessionRepository) {}

  create(props: ICreateSession): Promise<ISession> {
    return this.sessionRepository.create(props);
  }
}
