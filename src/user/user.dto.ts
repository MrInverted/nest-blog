import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsBase64, IsNumber, IsOptional, IsString } from "class-validator"

export class UserDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  login: string

  @ApiProperty()
  email: string | undefined

  @ApiProperty()
  name: number | undefined

  @ApiProperty()
  age: string | undefined

  @ApiProperty()
  gender: string | undefined

  @ApiProperty()
  description: string | undefined

  @IsString()
  @IsOptional()
  @ApiProperty()
  imagePath: string | null
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string | null

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string | null

  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: "Age must be number" })
  @Type(() => Number)
  age: number | null

  @ApiProperty()
  @IsOptional()
  @IsString()
  gender: string | null

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string | null

  @ApiProperty()
  @IsOptional()
  @IsString()
  imagePath: string | null
}

export class UploadUserPhotoDTO {
  @ApiProperty({ type: 'string', format: "binary" })
  file: File
}

// ---------------

export class UpdateUserResponseDTO {
  @ApiProperty()
  success: boolean

  @ApiProperty({ type: () => UserDTO })
  user: UserDTO
}

export class UploadUserAvaterResponseDTO {
  @ApiProperty()
  success: boolean

  @ApiProperty({ type: () => UserDTO })
  user: UserDTO

  @ApiProperty()
  imagePath: string
}