import { NestFactory } from '@nestjs/core';
import { JobberExecuterModule } from './app.module';
import { init } from '@app/nestjs';
async function bootstrap() {
  const app = await NestFactory.create(JobberExecuterModule);
  await init(app);
}
await bootstrap();
