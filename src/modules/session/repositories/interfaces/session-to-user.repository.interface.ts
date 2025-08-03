export interface ISessionToUser {
  id: string;
  sessionId: string;
  userId: string;
  userAlias: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IJoinSession {
  userId: string;
  sessionId: string;
  userAlias: string;
  isHost: boolean;
}

export interface ILeaveSession {
  userId: string;
  sessionId: string;
}

export interface ISessionToUserRepository {
  getUsers(sessionId: string): Promise<ISessionToUser[]>;
  join(props: IJoinSession): Promise<void>;
  leave(props: ILeaveSession): Promise<void>;
}
