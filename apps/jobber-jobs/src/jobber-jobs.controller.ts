import { Controller, Get } from '@nestjs/common';
import { JobberJobsService } from './jobber-jobs.service.js';

@Controller()
export class JobberJobsController {
  constructor(private readonly jobberJobsService: JobberJobsService) {}

  @Get()
  getHello(): string {
    return this.jobberJobsService.getHello();
  }
}
