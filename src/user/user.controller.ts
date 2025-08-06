import { ApiBody, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { BadRequestException, Body, Controller, Headers, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateUserDTO, UpdateUserResponseDTO, UploadUserAvaterResponseDTO, UploadUserPhotoDTO } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';



const multerOptions: MulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 }, // 1MB file size limit
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(new BadRequestException('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
};

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdateUserResponseDTO })
  updateUser(@Body() body: UpdateUserDTO, @Headers("authorization") token: string) {
    return this.userService.updateUser(body, token);
  }

  @Post("avatar")
  @UseGuards(AuthGuard)
  @ApiBody({ type: UploadUserPhotoDTO })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({ type: UploadUserAvaterResponseDTO })
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadAvatar(@UploadedFile("file") file: Express.Multer.File, @Headers("authorization") token: string) {
    return this.userService.uploadAvatar(file, token);
  }
}
