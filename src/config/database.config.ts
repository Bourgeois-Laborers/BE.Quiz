import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function getDatabaseConfig(): TypeOrmModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.getOrThrow('POSTGRES_HOST'),
      port: configService.getOrThrow('POSTGRES_PORT'),
      database: configService.getOrThrow('POSTGRES_DB'),
      username: configService.getOrThrow('POSTGRES_USERNAME'),
      password: configService.getOrThrow('POSTGRES_PASSWORD'),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    inject: [ConfigService],
  };
}
