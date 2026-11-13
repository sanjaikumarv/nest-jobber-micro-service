import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init } from '@app/nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
}
await bootstrap();
