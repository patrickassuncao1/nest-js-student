import { usuario } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function createRandomUser(): usuario {
  return {
    id: faker.string.uuid(),
    nome: faker.internet.userName(),
    email: faker.internet.email(),
    senha: faker.internet.password(),
    atualizado_em: faker.date.anytime(),
    criado_em: faker.date.anytime(),
    criado_por: faker.string.uuid(),
    ativo: true,
    cpf: faker.string.alphanumeric(11),
    deletado_em: null,
  };
}
