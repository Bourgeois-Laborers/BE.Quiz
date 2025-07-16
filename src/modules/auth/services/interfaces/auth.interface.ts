export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  id: string;
}

export interface IAuthService {
  login(userId: string): Promise<IAuth>;
}
