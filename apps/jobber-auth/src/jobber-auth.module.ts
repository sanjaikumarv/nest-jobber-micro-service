import { Module } from '@nestjs/common';
import { JobberAuthController } from './jobber-auth.controller.js';
import { JobberAuthService } from './jobber-auth.service.js';

@Module({
  imports: [],
  controllers: [JobberAuthController],
  providers: [JobberAuthService],
})
export class JobberAuthModule {}
