import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configure API docs using Swagger.
  const docsConfig = new DocumentBuilder()
    .setTitle('Faculty UPI API')
    .setDescription('The documentation of Faculty UPI API')
    .setVersion(process.env.npm_package_version)
    .build();

  const document = SwaggerModule.createDocument(app, docsConfig);
  SwaggerModule.setup('', app, document);

  // Set validation pipe for entire app.
  app.useGlobalPipes(new ValidationPipe());

  // Configure app host and port.
  const host = process.env.HOST;
  const port = process.env.PORT;

  await app.listen(port, host);
  console.log(`App run successfully at ${await app.getUrl()}.`);
}
bootstrap();
