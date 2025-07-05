import {
  ClassSerializerInterceptorOptions,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

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

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
