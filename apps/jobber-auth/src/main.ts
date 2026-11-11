import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@proto/types/auth';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  const port = app.get(ConfigService).getOrThrow<number>('PORT');

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(process.cwd(), 'proto/auth.proto'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(port);
}
await bootstrap();
