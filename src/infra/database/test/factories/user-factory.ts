import { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function createRandomUser(): User {
  return {
    id: 'f343bb48-de72-4d18-9d1d-fc4d5205b2e8',
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    updated_at: faker.date.anytime(),
    created_at: faker.date.anytime(),
  };
}
