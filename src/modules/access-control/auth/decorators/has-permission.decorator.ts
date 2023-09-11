import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_PERMISSION_KEY = 'hasPermission';
export const HasPermission = (permissions: string[]) =>
  SetMetadata(IS_PUBLIC_PERMISSION_KEY, permissions);
