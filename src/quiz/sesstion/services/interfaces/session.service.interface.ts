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

export interface ISessionService {
  create(props: ICreateSession): Promise<ISession>;
  start(sessionId: string, userId: string): Promise<ISession>;
  pause(sessionId: string, userId: string): Promise<ISession>;
  finish(sessionId: string, userId: string): Promise<ISession>;
}
