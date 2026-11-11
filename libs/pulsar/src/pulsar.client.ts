import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pulsar from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client: Pulsar.Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Pulsar.Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }

  async onModuleDestroy() {
    await this.client.close();
  }
  async createProducer(topic: string) {
    return this.client.createProducer({
      topic,
    });
  }
}
