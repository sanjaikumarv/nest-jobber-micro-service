import { Injectable } from '@nestjs/common';

@Injectable()
export class JobberJobsService {
  getHello(): string {
    return 'Hello World!';
  }
}
