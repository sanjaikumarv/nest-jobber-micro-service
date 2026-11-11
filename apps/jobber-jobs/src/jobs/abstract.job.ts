import { Producer } from 'pulsar-client';
import { PulsarClient } from '@app/pulsar';
import { OnModuleDestroy } from '@nestjs/common';
export abstract class AbstractJob<T> implements OnModuleDestroy {
  constructor(private readonly pulsarClient: PulsarClient) {}
  private producer: Producer;
  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }

  async onModuleDestroy() {
    await this.producer.close();
  }
}
