import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';

import { swaggerSetup } from '@config/swagger.config';
import { redisIOAdapterSetup } from '@config/redis-io.config';

import { LogicExceptionFilter } from '@common/filters/logic-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  swaggerSetup(app);

  await redisIOAdapterSetup(app, configService.getOrThrow<string>('REDIS_URL'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new LogicExceptionFilter());
  app.use(cookieParser());

  const allowedOrigins: string[] = configService.getOrThrow<string>('CORS_ORIGINS').split(',');
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
