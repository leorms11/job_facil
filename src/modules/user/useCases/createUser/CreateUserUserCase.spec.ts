import "reflect-metadata";
import { UsersRepositoryInMemory } from "@modules/user/repositories/in-memory/UsersRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

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
      cpf: "00000000000",
      occupation: "teste",
      phone: "35999999999",
    };

    await createUserUseCase.execute(requestData);

    expect(usersRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: requestData.email,
          cpf: requestData.cpf,
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
      cpf: "11111111111",
      occupation: "teste",
      phone: "35999999999",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(AppError);
  });

  it("Should not be able to create an user within an already existent cpf", async () => {
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
      email: "teste2@teste.com",
      password: "teste",
      confirmPassword: "teste",
      cpf: "99999999999",
      occupation: "teste",
      phone: "35999999999",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(AppError);
  });

  it("Should not be able to create an user within a password different of confirmPassword", async () => {
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
      email: "teste3@teste.com",
      password: "teste",
      confirmPassword: "test",
      cpf: "99999999911",
      occupation: "teste",
      phone: "35999999999",
    };

    await expect(createUserUseCase.execute(requestData)).rejects.toThrowError(AppError);
  });
});
