import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  accessToken: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',
  },
}));
