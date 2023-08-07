import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async create<T extends Prisma.UserCreateArgs>(
    prismaOperations: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
  ) {
    const newUser = await this.prismaService.user.create(prismaOperations);
    return newUser;
  }

  async findFirst<T extends Prisma.UserFindFirstArgs>(
    prismaOperations: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs>,
  ) {
    const user = await this.prismaService.user.findFirst(prismaOperations);
    return user;
  }
}
