import { usuario } from "@prisma/client";

export type PermissionType = {
  url: string;
  operacao: {
    nome: string;
    icone: string;
    url: string;
    identificador: string;
    pagina: boolean;
  }[];
};

export type RequestUser = {
  user: usuario;
  permissions: PermissionType[];
  perfis: string[]
};
