import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";

@UseGuards(JwtAuthGuard)
@Controller("user")
@ApiTags("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 400, description: "Dados inválidos." })
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.create(createUserDto);
  }
  
  @ApiOperation({ summary: "Listar todos os usuários" })
  @ApiResponse({
    status: 200,
    description: "Lista de usuários recuperada com sucesso.",
    type: [CreateUserDto],
  })
  @Get()
  async findAll(): Promise<any[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: "Obter um usuário pelo ID" })
  @ApiResponse({
    status: 200,
    description: "Usuário recuperado com sucesso.",
    type: CreateUserDto,
  })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  @Get(":id")
  async findOne(@Param("id") id: number): Promise<any> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: "Criar um novo usuário" })
  @ApiResponse({
    status: 201,
    description: "Usuário criado com sucesso.",
    type: CreateUserDto,
  })
  

  @ApiOperation({ summary: "Atualizar um usuário pelo ID" })
  @ApiResponse({
    status: 200,
    description: "Usuário atualizado com sucesso.",
    type: UpdateUserDto,
  })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  @ApiResponse({ status: 400, description: "Dados inválidos." })
  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<any> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: "Deletar um usuário pelo ID" })
  @ApiResponse({ status: 204, description: "Usuário deletado com sucesso." })
  @ApiResponse({ status: 404, description: "Usuário não encontrado." })
  @Delete(":id")
  async delete(@Param("id") id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
