import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/user/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";
import { normalizeCpf } from "@shared/utils/StringHelpers";

import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepository: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeAll(() => {
    usersRepository = UsersRepositoryInMemory.getInstance();
  });

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it("Should be able to create an user", async () => {
    const requestData = {
      name: "Teste",
      email: "teste@teste.com",
      password: "teste",
      confirmPassword: "teste",
      cpf: "476.719.240-40",
      occupation: "teste",
      phone: "(35) 99876-5432",
    };

    await createUserUseCase.execute(requestData);

    expect(usersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: requestData.email,
          cpf: normalizeCpf(requestData.cpf),
        }),
      ])
    );
  });

  it("Should not be able to create an user within an already existent email", async () => {
    await usersRepository.create({
      name: "Already existent test",
      email: "existent@email.com",
      cpf: "99999999999",
      phone: "35999999999",
      occupation: "Test",
      password: "test",
    });

    const requestData = {
      name: "Teste",
      email: "existent@email.com",
      password: "teste",
      confirmPassword: "teste",
      cpf: "201.525.530-37",
      occupation: "teste",
      phone: "(35) 99876-5432",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(
      "Email já cadastrado!"
    );
  });

  it("Should not be able to create an user within an already existent cpf", async () => {
    await usersRepository.create({
      name: "Already existent test",
      email: "existent2@email.com",
      cpf: "66645359047",
      phone: "35999999999",
      occupation: "Test",
      password: "test",
    });

    const requestData = {
      name: "Teste",
      email: "teste2@teste.com",
      password: "teste",
      confirmPassword: "teste",
      cpf: "666.453.590-47",
      occupation: "teste",
      phone: "(35) 99876-5432",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(
      "CPF já cadastrado!"
    );
  });

  it("Should not be able to create an user within a password different of confirmPassword", async () => {
    const requestData = {
      name: "Teste",
      email: "teste3@teste.com",
      password: "teste",
      confirmPassword: "password_not_match",
      cpf: "334.829.630-70",
      occupation: "teste",
      phone: "(35) 99876-5432",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(
      "As senhas devem ser iguais!"
    );
  });
});
