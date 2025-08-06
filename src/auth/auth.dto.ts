import { ApiProperty } from "@nestjs/swagger"
import { IsString, MinLength } from "class-validator"

import { UserDTO } from "src/user/user.dto"



export class AuthUserDTO {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  login: string

  @IsString()
  @MinLength(5)
  @ApiProperty()
  password: string
}

export class AuthChangePasswordDTO {
  @IsString()
  @MinLength(5)
  @ApiProperty()
  oldPassword: string

  @IsString()
  @MinLength(5)
  @ApiProperty()
  newPassword: string
}

// ----------------------------------

export class AuthResponseSuccessDTO {
  @ApiProperty()
  success: boolean
}

export class AuthResponseLoginDTO {
  @ApiProperty()
  success: boolean

  @ApiProperty()
  token: string
}

export class AuthReponseMeDTO {
  @ApiProperty()
  success: boolean

  @ApiProperty({ type: () => UserDTO })
  user: UserDTO
}

