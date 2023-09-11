import { usuario } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { IsUnique } from 'src/utils/customValidations/is-unique';
export class CreateUserDto implements Partial<usuario> {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  @IsUnique('usuario', 'email')
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  @IsUUID()
  criado_por: string;
}
