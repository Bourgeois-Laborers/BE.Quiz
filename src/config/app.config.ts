import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  sessionSize: Number(process.env.SESSION_SIZE),
  redisUrl: process.env.REDIS_URL,
}));
