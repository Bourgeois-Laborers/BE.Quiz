export interface ICreateUser {
  id: string;
}

export interface IUserRepository {
  create(): Promise<ICreateUser>;
}
