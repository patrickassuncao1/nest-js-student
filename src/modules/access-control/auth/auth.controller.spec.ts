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

describe('AuthController', () => {
  let authController: AuthController;

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
    app.get<PrismaService>(PrismaService);
  });

  describe('Login', () => {
    it('should return access Token"', async () => {
      // act
      const login = await authController.login(
        requestTest as CustomRequestType,
      );

      expect(login).toHaveProperty('data');
      expect(login).toHaveProperty('accessToken');
    });
  });
  
});
