import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/infra/env/env';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { createRandomUser } from 'src/infra/database/test/factories/user-factory';
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
    it('should return a user ', async () => {
      //arranje
      const user = createRandomUser();

      const loginData: LoginDto = {
        email: user.email,
        password: user.password,
      };

      user.password = await hash(user.password, 8);

      prisma.user.findFirst = jest.fn().mockResolvedValue(user);

      // act
      const response = await authService.validateUser(loginData);

      //assert
      expect(response).toEqual(user);
    });

    it('should throw bad prompt exception if password is incorrect ', async () => {
      //arranje
      const user = createRandomUser();
      user.password = await hash(user.password, 8);

      const loginData: LoginDto = {
        email: user.email,
        password: '1',
      };

      prisma.user.findFirst = jest.fn().mockResolvedValue(user);

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
        password: user.password,
      };

      prisma.user.findFirst = jest.fn().mockResolvedValue(user);

      // act
      const response = authService.validateUser(loginData);

      //assert
      await expect(response).rejects.toThrowError(BadRequestException);
    });
  });

  describe('login', () => {
    it('should return access Token ', () => {
      //arranje
      const user = createRandomUser();

      // act
      const login = authService.login(user);

      //assert
      expect(login).toHaveProperty('accessToken');
    });
  });
});
