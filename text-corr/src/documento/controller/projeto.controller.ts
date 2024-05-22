import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { ProjetoService } from "../service/projeto.service";
import { CreateProjetoDto, UpdateProjetoDto } from "../dto/projeto.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";

@UseGuards(JwtAuthGuard)
@Controller("projetos")
@ApiTags("projetos")
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjetoDto: CreateProjetoDto) {
    return this.projetoService.create(createProjetoDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateProjetoDto: UpdateProjetoDto
  ) {
    return this.projetoService.update(id, updateProjetoDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: number) {
    await this.projetoService.remove(id);
    return null;
  }

  @Get()
  async findAll() {
    return this.projetoService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.projetoService.findOne(id);
  }
}
