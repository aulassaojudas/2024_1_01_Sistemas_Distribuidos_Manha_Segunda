import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  senha: string;
}

export class LoginSuccessDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string | null;

  @ApiProperty({ type: LoginDto })
  user: LoginDto;
}

export class LoginFailureDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

export const loginDto : LoginDto = {
  email: "exemplo@email.com",
  senha: "sua_senha",
}

export const loginFailureDto = {
  status: 400,
  description: "Credenciais inválidas.",
  type: LoginFailureDto,
};

export const loginSuccessResponse = {
  status: 201,
  description: "Login realizado com sucesso.",
  access_token: "string", 
  type: LoginSuccessDto,
};
