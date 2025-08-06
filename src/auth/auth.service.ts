import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { AuthChangePasswordDTO, AuthUserDTO } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) { }

  async registerUser(body: AuthUserDTO) {
    const isAlreadyExist = await this.prisma.user.findFirst({
      where: { login: body.login }
    })

    if (isAlreadyExist) throw new BadRequestException("User with current login is already exist");

    const hashedPassword = await bcrypt.hash(body.password, 8);

    await this.prisma.user.create({
      data: {
        login: body.login,
        password: hashedPassword
      }
    })

    return { success: true }
  }

  async loginUser(body: AuthUserDTO) {
    const user = await this.prisma.user.findFirst({
      where: { login: body.login }
    })

    if (!user) throw new UnauthorizedException("Wrong login");

    const hashedPassword = await bcrypt.compare(body.password, user.password);

    if (!hashedPassword) throw new UnauthorizedException("Wrong password");

    const token = await this.jwtService.signAsync({ id: user.id })

    return { success: true, token }
  }

  async getMe(incToken: string) {
    const [_, token] = incToken.split(" ");

    const { id } = this.jwtService.decode(token);

    const user = await this.prisma.user.findFirst({
      where: { id },
      omit: { password: true }
    })

    return { success: true, user };
  }

  async changePassword(body: AuthChangePasswordDTO, incToken: string) {
    const [_, token] = incToken.split(" ");

    const { id } = this.jwtService.decode(token);

    const user = await this.prisma.user.findFirst({
      where: { id }
    });

    const oldHashedPassword = await bcrypt.compare(body.oldPassword, user.password);

    if (!oldHashedPassword) throw new BadRequestException("Wrong old password");

    const newHashedPassword = await bcrypt.hash(body.newPassword, 8);

    await this.prisma.user.update({
      where: { id },
      data: {
        password: newHashedPassword
      }
    })

    return { success: true };
  }
}
