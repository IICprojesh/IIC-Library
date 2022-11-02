import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
    }),
  );
  const PORT = 3500;
  await app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });
}
bootstrap();
