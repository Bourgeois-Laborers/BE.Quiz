export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser {
  id: string;
}

export interface IUserRepository {
  create(): Promise<ICreateUser>;
  get(id: string): Promise<IUser | null>;
}
