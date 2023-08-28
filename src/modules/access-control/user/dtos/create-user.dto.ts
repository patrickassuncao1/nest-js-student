
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsUnique } from 'src/utils/customValidations/is-unique';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsUnique('user', 'email')
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
