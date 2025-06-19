export interface ISession {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSession {
  userId: string;
}

export interface ISessionService {
  create(props: ICreateSession): Promise<ISession>;
}
