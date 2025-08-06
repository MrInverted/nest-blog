import { JwtService } from '@nestjs/jwt';
import { Injectable, BadRequestException } from '@nestjs/common';

import { PrismaService } from './../prisma/prisma.service';
import { UpdateUserDTO } from './user.dto';



@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
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


  async uploadAvatar(file: Express.Multer.File, incToken: string) {
    const [_, token] = incToken.split(" ");

    const { id } = this.jwtService.decode(token);

    if (!file) throw new BadRequestException("No file");
    const imagePath = "/uploads/" + file.filename;

    const user = await this.prisma.user.update({
      where: { id },
      data: { imagePath },
      omit: { password: true }
    });

    return { success: true, imagePath, user }
  }
}
