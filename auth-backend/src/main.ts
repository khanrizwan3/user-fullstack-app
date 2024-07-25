import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.CORS_ORIGIN, // Get from environment variable  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Enable Helmet middleware for security  
  app.use(helmet());

  // Set up rate limiting  
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes  
    max: 100, // Limit each IP to 100 requests per windowMs  
  });

  app.use(limiter);

  app.useLogger(['error', 'warn', 'log']); // Specify log levels  

  const port = process.env.PORT || 3000; // Fallback to 3000 if not set  
  await app.listen(port);
}
bootstrap();