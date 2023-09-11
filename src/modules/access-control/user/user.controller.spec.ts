import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/infra/database/prisma.service';
import { createRandomUser } from 'src/infra/database/test/factories/user-factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserController, UserService],
    }).compile();

    userController = app.get<UserController>(UserController);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('Create', () => {
    it('should create user ', async () => {
      //arranje
      const user = createRandomUser();

      prisma.usuario.create = jest.fn().mockResolvedValue(user);

      // act
      const response = await userController.create(user);
      delete user.senha;

      expect(response.data).toEqual(user);
    });
  });
});
