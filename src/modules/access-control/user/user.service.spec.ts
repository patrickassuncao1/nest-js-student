import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { createRandomUser } from 'src/infra/database/test/factories/user-factory';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserService],
    }).compile();

    userService = app.get<UserService>(UserService);
    prisma = app.get<PrismaService>(PrismaService);
  });

  describe('Create', () => {
    it('should create user ', async () => {
      //arranje
      const user = createRandomUser();

      prisma.usuario.create = jest.fn().mockResolvedValue(user);

      // act
      const response = await userService.create(user);
      delete user.senha;

      expect(response).toEqual(user);
    });
  });
});
