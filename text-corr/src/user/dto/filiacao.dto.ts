import { IsString, Length, IsInt } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFiliacaoDto {
  @ApiProperty({
    description: 'Nome do usuário',
    minimum: 8,
    maximum: 40,
    example: 'João Silva',
  })
  @IsString()
  @Length(8, 40, { message: "o tamanho minimo do nome é 8 caracteres" })
  nome: string;

  @ApiProperty({
    description: 'Endereço do usuário',
    minimum: 12,
    maximum: 40,
    example: 'Rua das Flores, 123',
  })
  @IsString()
  @Length(12, 40, { message: "o tamanho minimo do endereço é 12 caracteres" })
  endereco: string;

  @ApiProperty({
    description: 'Cidade do usuário',
    minimum: 8,
    maximum: 30,
    example: 'São Paulo',
  })
  @IsString()
  @Length(8, 30, { message: "o tamanho minimo do cidade é 8 caracteres" })
  cidade: string;

  @ApiProperty({
    description: 'Bairro do usuário',
    minimum: 8,
    maximum: 30,
    example: 'Jardins',
  })
  @IsString()
  @Length(8, 30, { message: "o tamanho minimo do bairro é 8 caracteres" })
  bairro: string;

  @ApiProperty({
    description: 'Unidade Federativa (UF)',
    minimum: 2,
    maximum: 2,
    example: 'SP',
  })
  @IsString()
  @Length(2, 2, { message: "o tamanho minimo do nome é 2 caracteres" })
  uf: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
  })
  @IsInt()
  userId: number;
}

export class UpdateFiliacaoDto extends PartialType(CreateFiliacaoDto) {}
