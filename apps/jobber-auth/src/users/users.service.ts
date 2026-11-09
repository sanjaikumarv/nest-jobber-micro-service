import { Injectable } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client';
import { UserDbService } from './models/user.db-service';
import { hash } from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(private readonly userDbService: UserDbService) {}
  async createUser(data: Prisma.UserCreateInput) {
    return this.userDbService.create({
      data: {
        ...data,
        password: await hash(data.password, 10),
      },
    });
  }
}
