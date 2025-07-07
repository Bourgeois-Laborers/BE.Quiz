export interface ILoginProps {
  userId: string;
}

export interface ITokenPayload {
  id: string;
}

export interface IAuthService {
  login(userId: string): Promise<ITokenPayload>;
}
