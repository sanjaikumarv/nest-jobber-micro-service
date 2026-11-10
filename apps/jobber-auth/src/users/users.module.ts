import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserDbService } from './models/user.db-service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [UsersService, UsersResolver, UserDbService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}
