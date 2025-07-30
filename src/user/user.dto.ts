import { ApiProperty } from "@nestjs/swagger"

export class UserDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  login: string

  @ApiProperty()
  email: string | undefined

  @ApiProperty()
  name: string | undefined

  @ApiProperty()
  age: string | undefined

  @ApiProperty()
  gender: string | undefined

  @ApiProperty()
  description: string | undefined
}

export class UpdateUserDTO {
  @ApiProperty()
  email: string | undefined

  @ApiProperty()
  name: string | undefined

  @ApiProperty()
  age: string | undefined

  @ApiProperty()
  gender: string | undefined

  @ApiProperty()
  description: string | undefined
}

// ---------------

export class UpdateUserResponseDTO {
  @ApiProperty()
  success: boolean

  @ApiProperty({ type: () => UserDTO })
  user: UserDTO
}