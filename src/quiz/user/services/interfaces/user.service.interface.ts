export interface ICreateUser {
  id: string;
}
export interface IUserService {
  create(): Promise<ICreateUser>;
}
