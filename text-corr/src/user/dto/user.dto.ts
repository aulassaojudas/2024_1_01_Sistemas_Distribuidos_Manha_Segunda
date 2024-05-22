import { IsEmail, IsString, Length, Matches } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ description: "Nome do usuário", example: "João da Silva" })
  @IsString()
  @Length(8, 40, { message: "O tamanho mínimo do nome é 8 caracteres" })
  nome: string;

  @ApiProperty({
    description: "E-mail do usuário",
    example: "joao.silva@example.com",
  })
  @IsEmail()
  @Length(8, 40, { message: "O tamanho mínimo do e-mail é 8 caracteres" })
  email: string;

  @ApiProperty({ description: "Senha do usuário", example: "Senha@123" })
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      "A senha deve ter pelo menos 8 caracteres, incluindo pelo menos: uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
  })
  senha: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
