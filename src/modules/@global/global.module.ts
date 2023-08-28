import { Module, Global } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { IsUniqueConstraint } from 'src/utils/customValidations/is-unique';

@Global()
@Module({
  providers: [PrismaService, IsUniqueConstraint],
  exports: [PrismaService, IsUniqueConstraint],
})
export class GlobalModule {}
