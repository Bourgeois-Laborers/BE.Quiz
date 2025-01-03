import { INestApplication } from '@nestjs/common';

import { RedisIoAdapter } from '@common/adapters/redis-io.adapter';

export const redisIOAdapterSetup = async (app: INestApplication, redisUrl: string): Promise<void> => {
  const redisIoAdapter = new RedisIoAdapter(app);

  await redisIoAdapter.connectToRedis(redisUrl);

  app.useWebSocketAdapter(redisIoAdapter);
};
