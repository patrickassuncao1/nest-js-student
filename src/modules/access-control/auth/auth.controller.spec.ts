import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from 'src/infra/env/env';
import { PrismaService } from 'src/infra/database/prisma.service';
import { requestTest } from './test/mocks';
import { CustomRequestType } from 'src/@types/other';
import { createRandomRefreshToken } from 'src/infra/database/test/factories/refresh-token-factory';

describe('AuthController', () => {
  let authController: AuthController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [PrismaService, AuthService, LocalStrategy, JwtStrategy],
      imports: [
        JwtModule.register({
          secret: envConfig.JWT_SECRET,
          signOptions: { expiresIn: envConfig.JWT_EXPIRES_IN },
        }),
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('Login', () => {
    it('should return access Token"', async () => {
      const refreshToken = createRandomRefreshToken();
      prisma.refresh_token.findFirst = jest
        .fn()
        .mockResolvedValue(refreshToken);
      prisma.refresh_token.create = jest.fn().mockResolvedValue(refreshToken);

      // act
      const login = await authController.login(
        requestTest as CustomRequestType,
      );

      expect(login).toHaveProperty('data');
      expect(login).toHaveProperty('accessToken');
    });
  });
});
