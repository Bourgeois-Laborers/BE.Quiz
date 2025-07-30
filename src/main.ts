import {
  ClassSerializerInterceptorOptions,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { WsAuthService } from './modules/auth/services/ws-auth.service';
import { RedisIoAdapter } from './modules/socket/redis-io.adapter';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Quiz swagger')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  const serializerOptions: ClassSerializerInterceptorOptions = {
    // strategy: 'exposeAll',
    excludeExtraneousValues: true,
    exposeDefaultValues: true,
  };
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), serializerOptions),
  );

  const configService = app.get(ConfigService);
  const redisIoAdapter = new RedisIoAdapter(app);

  const wsAuthService = app.get(WsAuthService);
  redisIoAdapter.setAuthService(wsAuthService);

  await redisIoAdapter.connectToRedis(
    configService.get<string>('REDIS_URL') ?? '',
  );

  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
