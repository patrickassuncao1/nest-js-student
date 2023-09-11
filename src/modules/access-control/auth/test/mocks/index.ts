import { createRandomUser } from 'src/infra/database/test/factories/user-factory';

const randomUser = createRandomUser();

export const requestTest = {
  params: {},
  query: {},
  body: {},
  headers: {},
  user: {
    user: randomUser,
    permissions: [],
  },
};
