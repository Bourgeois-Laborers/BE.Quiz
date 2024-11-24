import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Quiz')
  .setDescription('Quiz API description')
  .setVersion('0.0.0')
  .addTag('Quiz')
  .build();

export const swaggerSetup = (app: INestApplication) => {
    const documentFactory = () => SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, documentFactory);
}