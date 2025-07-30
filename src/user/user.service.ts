import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService
  ) { }

  async updateUser(body: UpdateUserDTO, incToken: string) {
    const [_, token] = incToken.split(" ");

    const { id } = this.jwtService.decode(token);

    const data = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value != null)
    );

    const user = await this.prisma.user.update({
      where: { id },
      data,
      omit: { password: true }
    });

    return { success: true, user }
  }
}
