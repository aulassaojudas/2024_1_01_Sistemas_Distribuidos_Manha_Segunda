import { Module } from '@nestjs/common';
import { ProjetoService } from './service/projeto.service';
import { ProjetoController } from './controller/projeto.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projeto } from './entity/projeto.entity';
import { DocumentoService } from './service/documento.service';
import { DocumentoController } from './controller/documento.controller';
import { Documento } from './entity/documento.entity';
import { ProjetoDocumentoUser } from './entity/projeto_documento_user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Projeto, Documento, ProjetoDocumentoUser]),
  ],
  providers: [ProjetoService, DocumentoService],
  controllers: [ProjetoController, DocumentoController]
})
export class DocumentoModule {}
