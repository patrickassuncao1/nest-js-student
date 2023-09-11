import * as dayjs from 'dayjs';
import { PrismaService } from 'src/infra/database/prisma.service';

class GenerateRefreshToken {
  prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async execute(userId: string) {
    const expireIn = dayjs().add(244, 'd').unix(); //8 meses

    const refreshTokenAlreadyExist =
      await this.prismaService.refresh_token.findUnique({
        where: {
          usuario_id: userId,
        },
      });

    if (refreshTokenAlreadyExist) {
      return refreshTokenAlreadyExist;
    }

    const generateRefreshToken = await this.prismaService.refresh_token.create({
      data: {
        usuario_id: userId,
        expires_in: expireIn,
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
