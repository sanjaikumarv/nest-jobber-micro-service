import { Module } from '@nestjs/common';
import { JobberAuthController } from './jobber-auth.controller.js';
import { JobberAuthService } from './jobber-auth.service.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [JobberAuthController],
  providers: [JobberAuthService],
})
export class JobberAuthModule {}
