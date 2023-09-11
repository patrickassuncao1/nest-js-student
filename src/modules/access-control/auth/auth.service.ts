import { Injectable, BadRequestException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { GenerateRefreshToken } from './useCases/generate-refresh-token';
import { UserPayload } from './models/UserPayload';
import { PermissionUser } from './useCases/permission-user';
import { RequestUser } from 'src/@types/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, senha }: LoginDto): Promise<RequestUser> {
    const usersAlreadyExists = await this.prismaService.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!usersAlreadyExists) {
      throw new BadRequestException('Email ou senha incorreta');
    }

    const passwordMatch = await compare(senha, usersAlreadyExists.senha);

    if (!passwordMatch) {
      throw new BadRequestException('Email ou senha incorreta');
    }

    const { perfis, permissions } = await new PermissionUser(
      this.prismaService,
    ).execute(usersAlreadyExists.id);

    return {
      user: usersAlreadyExists,
      permissions: permissions,
      perfis: perfis,
    };
  }

  async login(data: RequestUser) {
    const { user, permissions, perfis } = data;

    const payload: UserPayload = {
      userId: user.id,
      permissions: permissions,
      perfis: perfis,
    };

    const refresh_token = await new GenerateRefreshToken(
      this.prismaService,
    ).execute(user.id);

    delete refresh_token.expires_in;

    return {
      ...data,
      accessToken: this.jwtService.sign(payload),
      refreshToken: refresh_token,
    };
  }
}
