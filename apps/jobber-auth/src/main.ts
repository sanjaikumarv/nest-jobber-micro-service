import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@proto/types/auth';
import { join } from 'path';
import { init } from '@app/nestjs';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);
  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(process.cwd(), 'proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
}
await bootstrap();
