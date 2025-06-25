import { Status } from '../../types/status.type';

export interface ISession {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSession {
  userId: string;
  userAlias: string;
}

export interface IStartSession {
  sessionId: string;
}

export interface ISessionRepository {
  create(props: ICreateSession): Promise<ISession>;
  updateStatus(sessionId: string, status: Status): Promise<ISession>;
}
