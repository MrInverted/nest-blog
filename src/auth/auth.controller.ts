import { Body, Controller, Post, HttpCode, Get, UseGuards, Headers, Patch } from '@nestjs/common';
import { AuthChangePasswordDTO, AuthReponseMeDTO, AuthResponseLoginDTO, AuthResponseSuccessDTO, AuthUserDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';



@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(201)
  @Post("register")
  @ApiCreatedResponse({ type: AuthResponseSuccessDTO })
  registerUser(@Body() user: AuthUserDTO) {
    return this.authService.registerUser(user);
  }

  @Post("login")
  @ApiOkResponse({ type: AuthResponseLoginDTO })
  loginUser(@Body() user: AuthUserDTO) {
    return this.authService.loginUser(user);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: AuthReponseMeDTO })
  getMe(@Headers("authorization") token: string) {
    return this.authService.getMe(token)
  }

  @Patch("password")
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: AuthResponseSuccessDTO })
  changePassword(@Body() body: AuthChangePasswordDTO, @Headers("authorization") token: string) {
    return this.authService.changePassword(body, token);
  }
}
