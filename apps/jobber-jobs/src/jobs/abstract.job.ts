import { Producer } from 'pulsar-client';
import { PulsarClient } from '@app/pulsar';
export abstract class AbstractJob<T> {
  constructor(private readonly pulsarClient: PulsarClient) {}
  private producer: Producer;
  async execute(data: T, job: string) {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }
    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }
}
