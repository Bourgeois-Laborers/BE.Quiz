import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore, RedisStore } from 'cache-manager-redis-store';
import { INJECT_CACHE, INJECT_CACHE_CLIENT } from './cache.types';

export const cacheProvider: Provider[] = [
  {
    provide: INJECT_CACHE,
    useFactory: (configService: ConfigService): Promise<RedisStore> => {
      return redisStore({
        url: configService.get<string>('REDIS_URL'),
      });
    },
    inject: [ConfigService],
  },
  {
    provide: INJECT_CACHE_CLIENT,
    useFactory: (cacheService: RedisStore) => {
      return cacheService.getClient();
    },
    inject: [INJECT_CACHE],
  },
];
