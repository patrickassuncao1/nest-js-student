import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/access-control/user/user.module';
import { AuthModule } from './modules/access-control/auth/auth.module';
import { GlobalModule } from './modules/@global/global.module';
import { JwtAuthGuard } from './modules/access-control/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from './modules/access-control/auth/guards/permissions-auth.guard';
@Module({
  imports: [UserModule, AuthModule, GlobalModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
