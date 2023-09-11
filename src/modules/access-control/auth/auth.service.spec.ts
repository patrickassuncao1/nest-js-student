import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/infra/env/env';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import {
  createRandomUser,
  createRandomRefreshToken,
} from 'src/infra/database/test/factories/all-factories';
import { LoginDto } from './dtos/login.dto';
import { hash } from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, AuthService, LocalStrategy, JwtStrategy],
      imports: [
        JwtModule.register({
          secret: envConfig.JWT_SECRET,
          signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
        }),
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('validate User', () => {
    it('should return a user and permissions ', async () => {
      //arranje
      const user = createRandomUser();

      const loginData: LoginDto = {
        email: user.email,
        senha: user.senha,
      };

      user.senha = await hash(user.senha, 8);

      prisma.usuario.findFirst = jest.fn().mockResolvedValue(user);
      prisma.perfil.findMany = jest.fn().mockResolvedValue([]);

      // act
      const response = await authService.validateUser(loginData);

      //assert
      expect(response).toEqual({
        user: user,
        permissions: [],
      });
    });

    it('should throw bad prompt exception if senha is incorrect ', async () => {
      //arranje
      const user = createRandomUser();
      user.senha = await hash(user.senha, 8);

      const loginData: LoginDto = {
        email: user.email,
        senha: '1',
      };

      prisma.usuario.findFirst = jest.fn().mockResolvedValue(user);

      // act
      const response = authService.validateUser(loginData);

      //assert
      await expect(response).rejects.toThrowError(BadRequestException);
    });

    it('should throw bad prompt exception if email is incorrect ', async () => {
      //arranje
      const user = createRandomUser();

      const loginData: LoginDto = {
        email: 'email',
        senha: user.senha,
      };

      prisma.usuario.findFirst = jest.fn().mockResolvedValue(user);

      // act
      const response = authService.validateUser(loginData);

      //assert
      await expect(response).rejects.toThrowError(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return access Token ', async () => {
      //arranje
      const user = createRandomUser();
      const refreshToken = createRandomRefreshToken(user.id);

      prisma.refresh_token.findFirst = jest
        .fn()
        .mockResolvedValue(refreshToken);
      prisma.refresh_token.create = jest.fn().mockResolvedValue(refreshToken);

      // act
      const login = await authService.login({
        user: user,
        permissions: [],
      });

      //assert
      expect(login).toHaveProperty('accessToken');
      expect(login).toHaveProperty('refreshToken');
    });
  });
});
