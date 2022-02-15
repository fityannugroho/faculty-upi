import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

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

  // Configure app port.
  const port = process.env.PORT || process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`App run successfully at http://localhost:${port}.`);
}
bootstrap();
