import { Test, TestingModule } from '@nestjs/testing';
import { JobberJobsController } from './jobber-jobs.controller.js';
import { JobberJobsService } from './jobber-jobs.service.js';

describe('JobberJobsController', () => {
  let jobberJobsController: JobberJobsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobberJobsController],
      providers: [JobberJobsService],
    }).compile();

    jobberJobsController = app.get<JobberJobsController>(JobberJobsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobberJobsController.getHello()).toBe('Hello World!');
    });
  });
});
