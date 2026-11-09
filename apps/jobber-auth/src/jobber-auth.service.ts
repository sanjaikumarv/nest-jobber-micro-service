import { Injectable } from '@nestjs/common';

@Injectable()
export class JobberAuthService {
  getHello(): string {
    return 'Hello World!';
  }
}
