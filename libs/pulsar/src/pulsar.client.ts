import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Pulsar, { Consumer, Message, Producer } from 'pulsar-client';

@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client: Pulsar.Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Pulsar.Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }
  private readonly producers: Producer[] = [];
  private readonly consumers: Consumer[] = [];

  async onModuleDestroy() {
    for (const producer of this.producers) {
      await producer.close();
    }
  }
  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.client.subscribe({ topic, subscription: 'jobber', listener });
    this.consumers.push(consumer);
    return consumer;
  }
  async createProducer(topic: string) {
    const producer = await this.client.createProducer({
      topic,
    });
    this.producers.push(producer);
    return producer;
  }
}
