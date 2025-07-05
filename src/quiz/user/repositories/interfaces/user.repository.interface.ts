export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRepository {
  create(): Promise<IUser>;
  get(id: string): Promise<IUser | null>;
}
