import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export function getDatabaseConfig(): TypeOrmModuleAsyncOptions {
  return {
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.getOrThrow<string>('POSTGRES_HOST'),
      port: configService.getOrThrow<number>('POSTGRES_PORT'),
      database: configService.getOrThrow<string>('POSTGRES_DB'),
      username: configService.getOrThrow<string>('POSTGRES_USER'),
      password: configService.getOrThrow<string>('POSTGRES_PASSWORD'),
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV === 'development',
    }),
    inject: [ConfigService],
  };
}
