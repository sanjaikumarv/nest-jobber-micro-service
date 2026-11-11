import { Module } from '@nestjs/common';
import { JobberJobsController } from './jobber-jobs.controller.js';
import { JobberJobsService } from './jobber-jobs.service.js';

@Module({
  imports: [],
  controllers: [JobberJobsController],
  providers: [JobberJobsService],
})
export class JobberJobsModule {}
