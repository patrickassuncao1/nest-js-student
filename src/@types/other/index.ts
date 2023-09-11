import { Request } from 'express';
import { RequestUser } from '../auth';

export type CustomRequestType = Request & {
  user: RequestUser
};
