import { Controller, Get } from '@nestjs/common';
import { JobberAuthService } from './jobber-auth.service';

@Controller()
export class JobberAuthController {
  constructor(private readonly jobberAuthService: JobberAuthService) {}

  @Get()
  getHello(): string {
    return this.jobberAuthService.getHello();
  }
}
