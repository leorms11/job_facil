import { CreateUserDTO } from "@modules/user/dtos/CreateUserDTO";
import { IUsersRepository } from "@modules/user/repositories/IUsersRepository";
import { validate } from "class-validator";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  occupation: string;
  phone: string;
}

class CreateUserUseCase {
  constructor(private readonly usersRepository: IUsersRepository) {}

  // [X] Deve ser possível criar um User
  // [X] Não deve ser possível criar com email repetido
  // [X] Não deve ser possível criar com cpf repetido
  // [X] Não deve ser possível criar se o password for diferente do confirmPassword
  // [ ] Não deve ser possível criar com alguma info null
  // [ ] Validar se o email é válido
  // [ ] Validar se o CPF é válido
  // [ ] Remover todos os caracteres diferentes de números do telefone
  // [ ] Remover todos os caracteres diferentes de números do cpf

  async execute({
    name,
    email,
    password,
    confirmPassword,
    cpf,
    occupation,
    phone,
  }: IRequest): Promise<void> {
    const userDto = new CreateUserDTO({
      name,
      email,
      password,
      cpf,
      occupation,
      phone,
    });

    validate(userDto).then((errors) => {
      // errors is an array of validation errors
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
      } else {
        console.log("validation succeed");
      }
    });

    if (password !== confirmPassword) throw new AppError("AS senhas devem ser iguais!");

    const existentUserEmail = await this.usersRepository.findByEmail(email);
    if (existentUserEmail) throw new AppError("Email já cadastrado!");

    const existentUserCpf = await this.usersRepository.findByCpf(cpf);
    if (existentUserCpf) throw new AppError("CPF já cadastrado!");

    await this.usersRepository.create(userDto);
  }
}

export { CreateUserUseCase };
