import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
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

  await redisIOAdapterSetup(app, configService.getOrThrow('REDIS_URL'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new LogicExceptionFilter());
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
