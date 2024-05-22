jest.mock("src/user/entity/user.entity", () => {
  return { User: class User {} };
});

import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { User } from "src/user/entity/user.entity";

const userRepository = {
  findOne: jest.fn(),
};

const jwtService = {
  sign: jest.fn().mockReturnValue("mockedJwtToken"),
  verify: jest.fn(),
  decode: jest.fn(),
};

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("deve estar definido", () => {
    expect(service).toBeDefined();
  });

  describe("validateUser", () => {
    it("deve retornar dados do usuário sem a senha se o email e a senha forem válidos", async () => {
      const user = {
        id_user: 1,
        nome: "Test User",
        email: "test@example.com",
        senha: await bcrypt.hash("password", 10),
      };
      userRepository.findOne.mockResolvedValue(user);

      const result = await service.validateUser("test@example.com", "password");
      expect(result).toEqual({
        id_user: 1,
        nome: "Test User",
        email: "test@example.com",
      });
    });

    it("deve retornar null se a senha for inválida", async () => {
      const user = {
        id_user: 1,
        nome: "Test User",
        email: "test@example.com",
        senha: await bcrypt.hash("password", 10),
      };
      userRepository.findOne.mockResolvedValue(user);

      const result = await service.validateUser(
        "test@example.com",
        "wrongpassword"
      );
      expect(result).toBeNull();
    });

    it("deve retornar null se o usuário não for encontrado", async () => {
      userRepository.findOne.mockResolvedValue(null);
      const result = await service.validateUser(
        "nonexistent@example.com",
        "password"
      );
      expect(result).toBeNull();
    });
  });

  describe("login", () => {
    it("deve retornar um token de acesso", async () => {
      const user = { id_user: 1, email: "test@example.com" };
      const result = await service.login(user);

      expect(result).toEqual({ access_token: "mockedJwtToken" });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: user.email,
        sub: user.id_user,
      });
    });
  });
});
