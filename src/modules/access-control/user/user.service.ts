import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    const { password, ...rest } = user;

    const hashedPassword = await hash(password, 8);

    const newUser = await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        ...rest,
      },
    });

    delete newUser.password;

    return newUser;
  }
}
