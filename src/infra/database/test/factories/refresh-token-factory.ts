import { refresh_token } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function createRandomRefreshToken(userId?: string): refresh_token {
  return {
    id: faker.string.uuid(),
    expires_in: faker.number.int(),
    usuario_id: userId ?? faker.string.uuid(),
  };
}
