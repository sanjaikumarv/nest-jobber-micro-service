import { NestFactory } from '@nestjs/core';
import { JobberAuthModule } from './jobber-auth.module.js';

async function bootstrap() {
  const app = await NestFactory.create(JobberAuthModule);
  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
