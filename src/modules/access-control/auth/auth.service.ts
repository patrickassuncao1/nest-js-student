import { Injectable, BadRequestException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDto) {
    const usersAlreadyExists = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!usersAlreadyExists) {
      throw new BadRequestException('Email ou senha incorreta');
    }

    const passwordMatch = await compare(password, usersAlreadyExists.password);

    if (!passwordMatch) {
      throw new BadRequestException('Email ou senha incorreta');
    }

    return usersAlreadyExists;
  }

  login(user: User) {
    const payload = { username: user.name, sub: user.id };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
}
