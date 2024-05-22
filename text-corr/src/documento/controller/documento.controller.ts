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
} from "@nestjs/common";
import { DocumentoService } from "../service/documento.service";
import { CreateDocumentoDto } from "../dto/documento.dto";
import { UpdateDocumentoDto } from "../dto/documento.dto";

@Controller("documentos")
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  async create(
    @Body() createDocumentoDto: CreateDocumentoDto,
    @Body("userId") userId: number,
    @Body("projetoId") projetoId: number
  ) {
    return this.documentoService.create(createDocumentoDto, userId, projetoId);
  }

  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number) {
    return this.documentoService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: number,
    @Body() updateDocumentoDto: UpdateDocumentoDto
  ) {
    return this.documentoService.update(id, updateDocumentoDto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id") id: number) {
    await this.documentoService.remove(id);
    return null; // Retorna resposta HTTP 204 No Content
  }
}
