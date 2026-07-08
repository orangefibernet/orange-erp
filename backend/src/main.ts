import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API Prefix
  app.setGlobalPrefix('api/v1');

  // Enable CORS
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Global Exception Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Response Interceptor
  app.useGlobalInterceptors(
  new LoggingInterceptor(),
  new TransformInterceptor(),
   );

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('OrangeERP API')
    .setDescription('OrangeERP Backend REST API Documentation')
    .setVersion('v1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT Access Token',
      },
      'JWT',
    )
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('docs', app, swaggerDocument, {
    useGlobalPrefix: true,
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
      displayRequestDuration: true,
      filter: true,
      tryItOutEnabled: true,
    },
  });

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  console.log('========================================');
  console.log('🚀 OrangeERP Backend Started');
  console.log(`🌐 API Base URL : http://localhost:${port}/api/v1`);
  console.log(`📘 Swagger Docs: http://localhost:${port}/api/v1/docs`);
  console.log(`❤️  Health Check: http://localhost:${port}/api/v1/health`);
  console.log('========================================');
}

bootstrap();