import { PermissionType } from 'src/@types/auth';
export interface UserPayload {
  userId: string;
  permissions: PermissionType[];
  perfis: string[];
  iat?: number;
  exp?: number;
}
