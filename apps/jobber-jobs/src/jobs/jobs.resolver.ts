import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from './models/job.model';
import { JobService } from './jobs.service';
import { ExecuteJob } from './dto/execute-jobs.input';
@Resolver(() => Job)
export class JobsResolver {
  constructor(private readonly jobService: JobService) {}

  @Query(() => [Job], { name: 'jobs' })
  async getJobs() {
    return this.jobService.getJobs();
  }

  @Mutation(() => Job)
  async executeJob(@Args('executeJobInput') executeJobInput: ExecuteJob) {
    return this.jobService.executeJob(executeJobInput.name);
  }
}
