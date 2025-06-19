export interface ISessionToUserBase {
  userId: string;
  sessionId: string;
}

export type IJoinSession = ISessionToUserBase;

export interface ISessionToUserService {
  join(props: IJoinSession): Promise<void>;
}
