export interface ISessionToUserBase {
  userId: string;
  sessionId: string;
}

export type IJoinSession = ISessionToUserBase;
export type ICheckIsUserAlreadyJoined = ISessionToUserBase;

export interface ISessionToUserRepository {
  join(props: IJoinSession): Promise<void>;
  checkIsUserAlreadyJoined(props: ICheckIsUserAlreadyJoined): Promise<boolean>;
}
