import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Length, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateDocumentoDto {
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  anoPublicacao: number;

  @IsString()
  @Length(1, 100)
  titulo: string;

  @IsString()
  @Length(1, 100)
  discente: string;

  @IsString()
  @Length(1, 100)
  orientador: string;

  @IsString()
  @IsNotEmpty()
  resumo: string;
}

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {}