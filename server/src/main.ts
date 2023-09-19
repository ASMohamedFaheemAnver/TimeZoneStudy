import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'prod'
        ? ['error', 'warn']
        : ['log', 'debug', 'error', 'verbose', 'warn'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const PORT = process.env.PORT || 5000;
  await app.listen(PORT);
  const currentTime = new Date();
  console.log({
    msg: `SERVER IS UP AND RUNNING ON : ${PORT}, TZ : ${
      process.env.TZ
    } AND CURRENT TIME : ${currentTime.toLocaleString()}`,
  });
}
bootstrap();
