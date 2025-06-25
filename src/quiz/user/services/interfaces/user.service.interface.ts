import { IUser } from '../../repositories/interfaces/user.repository.interface';

export interface ICreateUser {
  id: string;
  accessToken: string;
}

export interface IUserService {
  create(): Promise<ICreateUser>;
  get(id: string): Promise<IUser | null>;
}
