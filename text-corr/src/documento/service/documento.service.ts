import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Documento } from "../entity/documento.entity";
import { ProjetoDocumentoUser } from "../entity/projeto_documento_user.entity";
import { CreateDocumentoDto, UpdateDocumentoDto } from "../dto/documento.dto";

@Injectable()
export class DocumentoService {
  constructor(
    @InjectRepository(Documento)
    private documentoRepository: Repository<Documento>,
    @InjectRepository(ProjetoDocumentoUser)
    private projetoDocumentoUserRepository: Repository<ProjetoDocumentoUser>
  ) {}

  async create(
    createDocumentoDto: CreateDocumentoDto,
    userId: number,
    projetoId: number
  ): Promise<Documento> {
    const documento = this.documentoRepository.create(createDocumentoDto);
    const savedDocumento = await this.documentoRepository.save(documento);

    const projetoDocumentoUser = this.projetoDocumentoUserRepository.create({
      documentoId: savedDocumento.id_documento,
      projetoId,
      userId,
      proprietario: true,
    });

    await this.projetoDocumentoUserRepository.save(projetoDocumentoUser);

    return savedDocumento;
  }

  async findAll(): Promise<Documento[]> {
    return this.documentoRepository.find({
      relations: ["palavrasChave", "projetoDocumentoUsers"],
    });
  }

  async findOne(id: number): Promise<Documento> {
    const documento = await this.documentoRepository.findOne({
      where: { id_documento: id },
      relations: ["palavrasChave", "projetoDocumentoUsers"],
    });
    if (!documento) {
      throw new NotFoundException(`Documento de ID ${id} não encontrado`);
    }
    return documento;
  }

  async update(
    id: number,
    updateDocumentoDto: UpdateDocumentoDto
  ): Promise<Documento> {
    const documento = await this.documentoRepository.preload({
      id_documento: id,
      ...updateDocumentoDto,
    });
    if (!documento) {
      throw new NotFoundException(`Documento de ID ${id} não encontrado`);
    }
    return this.documentoRepository.save(documento);
  }

  async remove(id: number): Promise<void> {
    const documento = await this.findOne(id);
    await this.documentoRepository.delete(id);
  }
}
