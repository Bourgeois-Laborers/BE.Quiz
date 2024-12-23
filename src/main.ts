import { NestFactory } from '@nestjs/core';

import { swaggerSetup } from '@config/swagger.config';
import { LogicExceptionFilter } from '@common/filters/logic-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new LogicExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
