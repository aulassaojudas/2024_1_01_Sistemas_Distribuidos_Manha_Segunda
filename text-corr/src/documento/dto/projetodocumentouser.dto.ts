import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsInt } from "class-validator";

export class CreateProjetoDocumentoUserDto {
  @IsInt()
  userId: number;

  @IsInt()
  projetoId: number;

  @IsInt()
  documentoId: number;

  @IsBoolean()
  proprietario: boolean = false;
}

export class UpdateProjetoDocumentoUserDto extends PartialType(
  CreateProjetoDocumentoUserDto
) {}
