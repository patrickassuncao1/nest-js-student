import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/infra/message/response-message';
import { HasPermission } from '../auth/decorators/has-permission.decorator';
@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HasPermission(['criar'])
  @Post()
  async create(@Body() createUser: CreateUserDto) {
    const newUser = await this.userService.create(createUser);

    const responseMessage = new ResponseMessage('Created', newUser);

    return responseMessage;
  }
}
