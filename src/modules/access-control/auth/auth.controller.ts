import { Controller, Request, UseGuards, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/infra/message/response-message';
import { LoginDto } from './dtos/login.dto';
import { CustomRequestType } from 'src/@types/other';
import { ResponseFormat } from 'src/infra/Interceptors/models/ResponseFormat';

@ApiExtraModels(ResponseFormat)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request: CustomRequestType) {
    const userReq = request.user;

    const { accessToken, refreshToken, ...user } =
      this.authService.login(userReq);

    const responseMessage = new ResponseMessage('Success', user);

    return {
      ...responseMessage,
      accessToken,
      refreshToken,
    };
  }
}
