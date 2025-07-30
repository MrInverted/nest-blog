import { UserService } from './user.service';
import { Body, Controller, Headers, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDTO, UpdateUserResponseDTO } from './user.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdateUserResponseDTO })
  updateUser(@Body() body: UpdateUserDTO, @Headers("authorization") token: string) {
    return this.userService.updateUser(body, token);
  }
}
