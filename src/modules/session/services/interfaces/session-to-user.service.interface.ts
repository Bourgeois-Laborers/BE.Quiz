export interface ISessionToUser {
  id: string;
  userId: string;
  sessionId: string;
  isHost: boolean;
  userAlias: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJoinSession {
  userId: string;
  sessionId: string;
  userAlias: string;
}

export interface ILeaveSession {
  userId: string;
  sessionId: string;
}

export interface ISessionToUserService {
  getUsers(sessionId: string): Promise<ISessionToUser[]>;
  join(props: IJoinSession): Promise<ISessionToUser[]>;
  leave(props: ILeaveSession): Promise<void>;
}
