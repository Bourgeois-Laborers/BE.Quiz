import { Module } from '@nestjs/common';
import { cacheProvider } from './cache.provider';
import { INJECT_CACHE, INJECT_CACHE_CLIENT } from './cache.types';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: cacheProvider,
  exports: [INJECT_CACHE, INJECT_CACHE_CLIENT],
})
export class CacheModule {}
