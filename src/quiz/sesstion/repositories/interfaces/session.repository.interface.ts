import { SessionStatus } from '../../types/session-status.type';

export interface ISession {
  id: string;
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSession {
  userAlias: string;
}

export type IUpdateSession = Partial<
  Omit<ISession, 'id' | 'createdAt' | 'updatedAt'>
>;

export interface ISessionRepository {
  get(sessionId: string, userId: string): Promise<ISession | null>;
  create(userId: string, props: ICreateSession): Promise<ISession>;
  update(
    sessionId: string,
    userId: string,
    props: IUpdateSession,
  ): Promise<ISession>;
}
