import { Controller, Request, UseGuards, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/infra/message/response-message';
import { LoginDto } from './dtos/login.dto';
import { CustomRequestType } from 'src/@types/other';
import { ResponseFormat } from 'src/infra/Interceptors/models/ResponseFormat';
import { Public } from './decorators/is-public.decorator';

@ApiExtraModels(ResponseFormat)
@ApiTags('Auth')
@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: CustomRequestType) {
    const userReq = request.user;

    const { accessToken, refreshToken, permissions, user } =
      await this.authService.login(userReq);

    delete user.senha;

    const responseMessage = new ResponseMessage('Success', {
      user,
      permissions,
    });

    return {
      ...responseMessage,
      accessToken,
      refreshToken,
    };
  }
}
