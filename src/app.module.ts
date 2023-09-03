import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './modules/access-control/user/user.module';
import { AuthModule } from './modules/access-control/auth/auth.module';
import { GlobalModule } from './modules/@global/global.module';
import { JwtAuthGuard } from './modules/access-control/auth/guards/jwt-auth.guard';
@Module({
  imports: [UserModule, AuthModule, GlobalModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
