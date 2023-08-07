import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaService } from './database/prisma.service';
import { IsUniqueConstraint } from './utils/customValidations/is-unique';

@Global()
@Module({
  imports: [UserModule],
  providers: [PrismaService, IsUniqueConstraint],
  exports: [PrismaService, IsUniqueConstraint],
})
export class AppModule {}
