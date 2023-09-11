import { PrismaService } from 'src/infra/database/prisma.service';

class PermissionUser {
  prismaService: PrismaService;

  constructor(prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async execute(userId: string) {
    const userPerfis = await this.prismaService.perfil.findMany({
      where: {
        usuario_perfil: {
          some: {
            usuario_id: userId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    if (userPerfis.length === 0) {
      return {
        perfis: [],
        permissions: [],
      };
    }

    const userPerfilIds = userPerfis.map((item) => {
      return item.id;
    });

    const submoduloAndOperations = await this.prismaService.submodulo.findMany({
      where: {
        operacao: {
          some: {
            perfil_operacao: {
              some: {
                perfil_id: {
                  in: userPerfilIds,
                },
              },
            },
          },
        },
      },
      select: {
        url: true,
        operacao: {
          select: {
            identificador: true,
            nome: true,
            pagina: true,
            icone: true,
            url: true,
          },
          where: {
            ativo: true,
            perfil_operacao: {
              some: {
                perfil_id: {
                  in: userPerfilIds,
                },
              },
            },
          },
        },
      },
    });

    return {
      perfis: userPerfilIds,
      permissions: submoduloAndOperations,
    };
  }
}

export { PermissionUser };
