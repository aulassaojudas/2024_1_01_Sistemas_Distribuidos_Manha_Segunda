import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsString, Length, Max, Min } from "class-validator";

export class CreateProjetoDto {
  @IsString()
  @Length(1, 40)
  titulo: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  ano_inicial: number;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 10)
  ano_final: number;
}

export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
