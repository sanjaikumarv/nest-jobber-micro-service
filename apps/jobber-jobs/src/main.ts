import { NestFactory } from '@nestjs/core';
import { JobberJobsModule } from './jobber-jobs.module.js';

async function bootstrap() {
  const app = await NestFactory.create(JobberJobsModule);
  await app.listen(process.env.port ?? 3000);
}
await bootstrap();
