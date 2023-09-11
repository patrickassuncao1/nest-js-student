import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { hash } from 'bcryptjs';
import { PrismaService } from 'src/infra/database/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(user: CreateUserDto) {
    const { senha, ...rest } = user;

    const hashedPassword = await hash(senha, 8);

    const newUser = await this.prismaService.usuario.create({
      data: {
        senha: hashedPassword,
        ...rest,
      },
    });

    //eslint-disable-next-line
    const { senha: password, ...restUser } = newUser;

    return restUser;
  }
}
