import { ValidationPipeOptions } from '@nestjs/common';

export const validationConfig: ValidationPipeOptions = {
  whitelist: true, // Strip properties that don't have decorators
  transform: true, // Transform payloads to DTO instances
  forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
};
