import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserRepository } from './repository/user-repository';
import { hash } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto) {
    const { password, ...rest } = user;

    const hashedPassword = await hash(password, 8);

    const newUser = await this.userRepository.create({
      data: {
        password: hashedPassword,
        ...rest,
      },
    });
    return newUser;
  }
}
