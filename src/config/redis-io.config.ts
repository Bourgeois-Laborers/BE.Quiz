import { RedisIoAdapter } from '@common/adapters/redis-io.adapter';
import { INestApplication } from '@nestjs/common';

export const redisIOAdaperSetup = async (app: INestApplication, redisUrl: string): Promise<void> => {
  const redisIoAdapter = new RedisIoAdapter(app);

  await redisIoAdapter.connectToRedis(redisUrl);

  app.useWebSocketAdapter(redisIoAdapter);
};
