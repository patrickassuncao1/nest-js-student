import { Module } from '@nestjs/common';
import { UserModule } from './modules/access-control/user/user.module';
import { AuthModule } from './modules/access-control/auth/auth.module';
import { GlobalModule } from './modules/@global/global.module';
@Module({
  imports: [UserModule, AuthModule, GlobalModule],
  providers: [],
  exports: [],
})
export class AppModule {}
