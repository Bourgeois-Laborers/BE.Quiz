export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserService {
  get(id: string): Promise<IUser>;
  create(): Promise<IUser>;
}
