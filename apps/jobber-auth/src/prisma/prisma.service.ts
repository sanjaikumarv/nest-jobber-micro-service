import { Injectable } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { softDeleteExtension } from './soft-delete.extension';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const connectionString = process.env.AUTH_DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        'Database connection string not found. Please set AUTH_DATABASE_URL or DATABASE_URL in your .env file.',
      );
    }

    const adapter = new PrismaPg({
      connectionString,
    });
    super({ adapter });

    // `$extends` returns a new client instead of mutating `this`, and proxies unknown members — so the hooks below survive.
    return this.$extends(softDeleteExtension) as unknown as PrismaService;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
