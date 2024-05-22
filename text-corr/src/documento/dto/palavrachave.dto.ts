import { PartialType } from "@nestjs/mapped-types";
import { IsString, Length, IsInt } from "class-validator";

export class CreatePalavraChaveDto {
  @IsString()
  @Length(1, 40)
  palavra: string;

  @IsInt()
  descritorId: number;

  @IsInt()
  documentoId: number;
}

export class UpdatePalavraChaveDto extends PartialType(CreatePalavraChaveDto) {}
