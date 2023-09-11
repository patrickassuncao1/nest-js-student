import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_PERMISSION_KEY } from '../decorators/has-permission.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.get(
      IS_PUBLIC_PERMISSION_KEY,
      context.getHandler(),
    );
    if (!permissions) {
      return true;
    }

    console.log(permissions);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log(user);

    return true;
  }
}
