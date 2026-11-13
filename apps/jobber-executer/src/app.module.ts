import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobModule } from './jobs/job.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/jobber-executer/.env', '.env'],
    }),
    JobModule,
  ],
})
export class JobberExecuterModule {}
