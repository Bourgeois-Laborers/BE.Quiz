export interface ISessionToUser {
  id: string;
  sessionId: string;
  userId: string;
  userAlias: string;
  isHost: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISessionToUserBase {
  userId: string;
  sessionId: string;
}

export interface IJoinSession extends ISessionToUserBase {
  userAlias: string;
  isHost: boolean;
}
export interface ICheckIsUserAlreadyJoined
  extends Omit<ISessionToUserBase, 'sessionId'>,
    Partial<Pick<ISessionToUserBase, 'sessionId'>> {
  isHost?: boolean;
}

export interface ICheckIsUserConnectedToSession {
  userId: string;
  sessionId: string;
  isHost: boolean[];
}

export interface ISessionToUserRepository {
  join(props: IJoinSession): Promise<void>;
  checkIsUserAlreadyJoined(props: ICheckIsUserAlreadyJoined): Promise<boolean>;
  checkIsSessionFull(sessionId: string): Promise<boolean>;
}
