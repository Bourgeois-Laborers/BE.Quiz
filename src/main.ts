import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerSetup } from '@config/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  swaggerSetup(app)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
