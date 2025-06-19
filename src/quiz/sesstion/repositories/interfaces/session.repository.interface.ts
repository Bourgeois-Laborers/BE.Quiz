export interface ISession {
  id: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateSession {
  userId: string;
}

export interface ISessionRepository {
  create(props: ICreateSession): Promise<ISession>;
}
