import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/infra/message/response-message';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    const newUser = await this.userService.create(createUser);

    const responseMessage = new ResponseMessage('Created', newUser);

    return responseMessage;
  }
}
