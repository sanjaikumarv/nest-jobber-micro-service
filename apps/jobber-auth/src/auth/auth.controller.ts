import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from '@proto/types/auth';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  authenticate(request: AuthenticateRequest): Promise<User> | Observable<User> | User {
    return {} as User;
  }
}
