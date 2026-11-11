import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveredClassWithMeta, DiscoveryService } from '@golevelup/nestjs-discovery';
import { JOB_METADATA_KEY } from '../decorators/job.decorator';
import { AbstractJob } from './jobs';
@Injectable()
export class JobService implements OnModuleInit {
  private jobs: DiscoveredClassWithMeta<AbstractJob>[] = [];
  constructor(private readonly discoveryService: DiscoveryService) {}
  async onModuleInit() {
    this.jobs = await this.discoveryService.providersWithMetaAtKey<AbstractJob>(JOB_METADATA_KEY);
  }
}
