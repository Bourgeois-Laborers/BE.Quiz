export interface ISessionToUserBase {
  userId: string;
  sessionId: string;
}

export interface IJoinSession extends ISessionToUserBase {
  userAlias: string;
}

export interface ICheckIsUserAlreadyJoined
  extends Omit<ISessionToUserBase, 'sessionId'>,
    Partial<Pick<ISessionToUserBase, 'sessionId'>> {
  isHost?: boolean;
}

export interface ISessionToUserService {
  join(props: IJoinSession): Promise<void>;
  checkIsUserAlreadyJoined(props: ICheckIsUserAlreadyJoined): Promise<boolean>;
}
