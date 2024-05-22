import { PartialType } from "@nestjs/mapped-types";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateDescritorDto {
  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  resumo: string;
}

export class UpdateDescritorDto extends PartialType(CreateDescritorDto) {}
