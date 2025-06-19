import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({}));
