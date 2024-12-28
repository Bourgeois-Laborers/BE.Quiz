import { NestFactory } from '@nestjs/core';

import { swaggerSetup } from '@config/swagger.config';
import { LogicExceptionFilter } from '@common/filters/logic-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { redisIOAdaperSetup } from '@config/redis-io.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  swaggerSetup(app);

  await redisIOAdaperSetup(app, configService.getOrThrow('REDIS_URL'));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  app.useGlobalFilters(new LogicExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
