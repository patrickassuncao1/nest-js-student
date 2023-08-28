import { User } from '@prisma/client';
import { Request } from 'express';

export type CustomRequestType = Request & {
  user: User;
};
