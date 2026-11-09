import { Test, TestingModule } from '@nestjs/testing';
import { JobberAuthController } from './jobber-auth.controller.js';
import { JobberAuthService } from './jobber-auth.service.js';

describe('JobberAuthController', () => {
  let jobberAuthController: JobberAuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobberAuthController],
      providers: [JobberAuthService],
    }).compile();

    jobberAuthController = app.get<JobberAuthController>(JobberAuthController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobberAuthController.getHello()).toBe('Hello World!');
    });
  });
});
