import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { corsConfig } from './config/cors.config';
import { validationConfig } from './config/validation.config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Enable CORS for frontend
  app.enableCors(corsConfig);
  logger.log('CORS enabled');

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe(validationConfig));
  logger.log('Global validation pipe configured');

  const port = process.env.PORT || 5000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error starting the application:', error);
  process.exit(1);
});
