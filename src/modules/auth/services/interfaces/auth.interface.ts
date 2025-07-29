import { IUser } from '@/modules/user/services/interfaces/user.service.interface';

export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  id: string;
}

export interface IAuthService {
  login(userId: string): Promise<{ user: IUser } & IAuth>;
  register(): Promise<{ user: IUser } & IAuth>;
  verifyAccessToken(token: string): Promise<ITokenPayload>;
  getAccessTokenMaxAgeMs(): number;
  getRefreshTokenMaxAgeMs(): number;
}
