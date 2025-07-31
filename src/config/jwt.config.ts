import { registerAs } from '@nestjs/config';

export interface JwtConfig {
  accessToken: {
    secret: string;
    expiresIn: string;
  };
  refreshToken: {
    secret: string;
    expiresIn: string;
  };
}

export const jwtConfig = registerAs(
  'jwt',
  (): JwtConfig => ({
    accessToken: {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET!,
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET!,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',
    },
  }),
);
