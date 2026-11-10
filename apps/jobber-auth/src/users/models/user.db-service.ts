import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class UserDbService {
  constructor(private readonly prisma: PrismaService) {}

  // Find user by ID

  async findUnique<T extends Prisma.UserFindUniqueArgs>(
    query: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
  ) {
    return this.prisma.user.findUnique(query);
  }
  async findFirst<T extends Prisma.UserFindFirstArgs>(
    query: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
  ) {
    return await this.prisma.user.findFirst(query);
  }

  // Create user
  async create<T extends Prisma.UserCreateArgs>(
    payload: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
    tx?: Prisma.TransactionClient,
  ) {
    return await (tx ?? this.prisma).user.create(payload);
  }

  async createMany<T extends Prisma.UserCreateManyArgs>(
    payload: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs>,
  ) {
    return await this.prisma.user.createMany(payload);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    payload: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
    tx?: Prisma.TransactionClient,
  ) {
    return await (tx ?? this.prisma).user.update(payload);
  }

  async count<T extends Prisma.UserCountArgs>(query: Prisma.SelectSubset<T, Prisma.UserCountArgs>) {
    return await this.prisma.user.count(query);
  }
  // Update user

  // Delete user
  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Get all users
  async findMany<T extends Prisma.UserFindManyArgs>(
    query?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>,
  ) {
    return await this.prisma.user.findMany(query);
  }
}
